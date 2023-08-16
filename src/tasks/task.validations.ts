import { UpdateTaskDto } from './dto/task.dto';
import { TaskStatus } from './tasks.entity';

export const validateUpdateTaskDto = (
  updatedFields: UpdateTaskDto,
): UpdateTaskDto => {
  const { title, description, status } = updatedFields;
  const validFields: UpdateTaskDto = {};

  if (title) {
    validFields.title = title;
  }
  if (description) {
    validFields.description = description;
  }
  if (status && Object.values(TaskStatus).includes(status)) {
    validFields.status = updatedFields.status;
  }

  return validFields;
};
