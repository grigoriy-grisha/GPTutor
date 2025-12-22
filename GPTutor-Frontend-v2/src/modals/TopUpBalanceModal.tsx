import { FC, useState } from "react";
import {
  Button,
  FormItem,
  Input,
  ModalPage,
  ModalPageHeader,
  Spacing,
  Spinner,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { paymentApi } from "../api";

interface TopUpBalanceModalProps {
  id: string;
}

export const TopUpBalanceModal: FC<TopUpBalanceModalProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [amount, setAmount] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    routeNavigator.hideModal();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем только числа и точку
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);

    if (!amount || isNaN(numAmount)) {
      setError("Введите сумму пополнения");
      return;
    }

    if (numAmount <= 0) {
      setError("Сумма должна быть больше 0");
      return;
    }

    if (numAmount < 70) {
      setError("Минимальная сумма пополнения: 70₽");
      return;
    }

    if (numAmount > 100000) {
      setError("Максимальная сумма пополнения: 100,000₽");
      return;
    }

    if (!email.trim()) {
      setEmailError("Введите email для чека");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Введите корректный email");
      return;
    }

    setLoading(true);
    setError("");
    setEmailError("");

    try {
      const response = await paymentApi.createPayment({
        amount: numAmount,
        description: `Пополнение баланса на ${numAmount}₽`,
        returnUrl: window.location.origin + "/profile",
        email: email.trim(),
      });

      console.log("Платеж создан:", response);

      // Открываем страницу оплаты ЮКассы в новой вкладке
      if (response.payment.confirmationUrl) {
        window.open(response.payment.confirmationUrl, "_blank");
        handleClose();
      } else {
        setError("Не удалось получить ссылку для оплаты");
      }
    } catch (err) {
      console.error("Ошибка создания платежа:", err);
      setError(
        err instanceof Error ? err.message : "Не удалось создать платеж"
      );
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <ModalPage
      id={id}
      onClose={handleClose}
      header={<ModalPageHeader>Пополнить баланс</ModalPageHeader>}
    >
      <form onSubmit={handleSubmit}>
        <FormItem
          top="Email для чека"
          status={emailError ? "error" : "default"}
          bottom={emailError || "На этот email будет отправлен чек"}
        >
          <Input
            type="email"
            placeholder="example@mail.ru"
            value={email}
            onChange={handleEmailChange}
          />
        </FormItem>

        <FormItem
          top="Сумма пополнения"
          status={error ? "error" : "default"}
          bottom={error || "Минимальная сумма: 70₽, максимальная: 100,000₽"}
        >
          <Input
            type="text"
            placeholder="Введите сумму"
            value={amount}
            onChange={handleAmountChange}
            after="₽"
            inputMode="decimal"
          />
        </FormItem>

        <FormItem top="Быстрый выбор">
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                mode="secondary"
                size="m"
                onClick={() => {
                  setAmount(String(quickAmount));
                  setError("");
                }}
                style={{ flex: "1 1 calc(50% - 4px)" }}
              >
                {quickAmount}₽
              </Button>
            ))}
          </div>
        </FormItem>

        <Spacing size={12} />

        <FormItem>
          <Button
            size="l"
            stretched
            mode="primary"
            type="submit"
            disabled={!email || !amount || !!error || !!emailError || loading}
            before={loading ? <Spinner size="s" /> : undefined}
          >
            {loading
              ? "Создание платежа..."
              : `Пополнить ${amount ? `на ${amount}₽` : ""}`}
          </Button>
        </FormItem>
      </form>
    </ModalPage>
  );
};
