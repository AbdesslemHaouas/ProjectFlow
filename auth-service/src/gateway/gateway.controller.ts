import {
  Controller, All, Req, Res, UseGuards, Param
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const serviceMap: Record<string, string> = {
  projects: 'http://localhost:3002',
  sprints:  'http://localhost:3002',
  backlog:  'http://localhost:3002',
  tasks:    'http://localhost:3003',
  comments: 'http://localhost:3003',
  hr:       'http://localhost:3004',
};

@Controller('api')
export class GatewayController {

  @All(':service/*')
  @UseGuards(JwtAuthGuard)
  async proxy(
    @Param('service') service: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const target = serviceMap[service];

    if (!target) {
      return res.status(404).json({ message: `Service '${service}' not found` });
    }

    // Inject user info into headers for downstream services
    const user = (req as any).user;
    if (user) {
      req.headers['x-user-id'] = String(user.id);
      req.headers['x-user-role'] = user.role;
      req.headers['x-user-email'] = user.email;
    }

    const proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path) => path.replace(`/api/${service}`, `/${service}`),
      on: {
        error: (err, req, res: any) => {
          res.status(502).json({ message: 'Service unavailable', service });
        },
      },
    });

    return proxy(req, res, (err) => {
      if (err) {
        res.status(502).json({ message: 'Gateway error' });
      }
    });
  }
}

