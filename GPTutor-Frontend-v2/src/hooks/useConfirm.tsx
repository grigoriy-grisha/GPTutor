import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ModalCard, Button, ButtonGroup } from '@vkontakte/vkui';
import { Icon56ErrorTriangleOutline } from '@vkontakte/icons';

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  mode?: 'destructive' | 'default';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

interface ConfirmProviderProps {
  children: ReactNode;
}

export const ConfirmProvider: React.FC<ConfirmProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }, []);

  const clearState = useCallback(() => {
    setTimeout(() => {
      setOptions(null);
      setResolvePromise(null);
    }, 500);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (options?.onConfirm) {
      setIsLoading(true);
      try {
        await options.onConfirm();
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen(false);
    resolvePromise?.(true);
    clearState();
  }, [options, resolvePromise, clearState]);

  const handleCancel = useCallback(() => {
    options?.onCancel?.();
    setIsOpen(false);
    resolvePromise?.(false);
    clearState();
  }, [options, resolvePromise, clearState]);

  const handleClose = useCallback(() => {
    handleCancel();
  }, [handleCancel]);

  const contextValue: ConfirmContextType = {
    confirm,
  };

  const isDestructive = options?.mode === 'destructive';

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      <ModalCard
        open={isOpen}
        onClose={handleClose}
        icon={options?.icon ?? (isDestructive ? <Icon56ErrorTriangleOutline style={{ color: 'var(--vkui--color_icon_negative)' }} /> : undefined)}
        title={options?.title}
        description={options?.description}
        dismissLabel="Закрыть"
        actions={
          <ButtonGroup gap="s" mode="horizontal" stretched>
            <Button
              size="l"
              mode="secondary"
              stretched
              onClick={handleCancel}
              disabled={isLoading}
            >
              {options?.cancelText ?? 'Отмена'}
            </Button>
            <Button
              size="l"
              mode={isDestructive ? 'primary' : 'primary'}
              appearance={isDestructive ? 'negative' : 'accent'}
              stretched
              onClick={handleConfirm}
              loading={isLoading}
            >
              {options?.confirmText ?? 'Подтвердить'}
            </Button>
          </ButtonGroup>
        }
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmContextType => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};
