import { PrismaClient } from 'prisma/client';
import { isEqual } from 'lodash';
import { cls } from '../common/context.service';

export function activityLoggerMiddleware(prisma: PrismaClient) {
  prisma.$use(async (params, next) => {
    const action = params.action;
    const model = params.model;

    const userId = (cls.get('userId') as string) || '';

    if (!userId || !model || !['create', 'update', 'delete'].includes(action) || model === 'ActivityLog') {
      return next(params);
    }

    let oldData: any = null;
    if (['update', 'delete'].includes(action) && params.args?.where) {
      oldData = await prisma[model].findUnique({
        where: params.args.where,
      });
    }

    const result = await next(params);

    const newData = action === 'delete' ? null : result;
    const diff = buildDiff(oldData, newData);

    setTimeout(() => {
      prisma.activityLog
        .create({
          data: {
            userId,
            action: action.toUpperCase(),
            collectionName: model,
            documentId: (result?.id ?? oldData?.id) as string,
            changeDiff: diff,
          },
        })
        .catch((err) => {
          console.error(
            `Error creating activity log for model ${model} with action ${action} for user ${userId}:`,
            err,
          );
        })
        .then(() => {
          console.log(`Activity log created for model ${model} with action ${action} for user ${userId}`);
        });
    }, 0);
    return result;
  });
}

function buildDiff(oldData: any, newData: any) {
  const changes: Record<string, { old: any; new: any }> = {};
  const keys = new Set([...Object.keys(oldData || {}), ...Object.keys(newData || {})]);
  keys.forEach((key) => {
    const oldVal = oldData?.[key];
    const newVal = newData?.[key];
    if (!isEqual(oldVal, newVal)) {
      changes[key] = { old: oldVal, new: newVal };
    }
  });
  return changes;
}
