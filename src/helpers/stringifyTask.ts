import type { BaseTask } from '@/tasks/BaseTask';
import type { LogDto } from '@/types';

export const stringifyTask = ({
	payload,
	projectId,
	requestId,
	type,
}: BaseTask): LogDto =>
	`task: ${type}, projectId: ${projectId}, requestId: ${requestId}, payload: ${JSON.stringify(payload)} `;
