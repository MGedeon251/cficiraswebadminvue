import { useNotifier } from './useNotifier';
import { extractErrorMessage } from './useErrorMessage';

export function handleError(error, fallbackMessage = 'Une erreur est survenue.') {
  const { notifyError } = useNotifier();
  const message = extractErrorMessage(error, fallbackMessage);
  notifyError(message);
}