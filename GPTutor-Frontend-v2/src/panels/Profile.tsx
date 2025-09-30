import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  Div,
  Group,
  NavIdProps,
  Panel,
  PanelHeader,
  Spacing,
  Title,
  Snackbar,
  ScreenSpinner,
  Placeholder,
} from "@vkontakte/vkui";
import {
  Icon28SettingsOutline,
  Icon28CopyOutline,
  Icon28RefreshOutline,
  Icon28MoneySendOutline,
  Icon28OnOffOutline,
  Icon28LinkOutline,
} from "@vkontakte/icons";
import { profileApi, UserProfile, VkData } from "../api/profileApi";
import { createCodeHTML, getCodeStyles } from "../utils/codeFormatter";
import "../styles/prism.css";

export interface ProfileProps extends NavIdProps {}

export const Profile: FC<ProfileProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vkData, setVkData] = useState<VkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingToken, setUpdatingToken] = useState(false);
  const [, setSnackbar] = useState<React.ReactNode>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeCodeExample, setActiveCodeExample] = useState<
    "curl" | "python" | "js"
  >("curl");

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await profileApi.getProfile();
      setProfile(response.user);
      setVkData(response.vkData);
    } catch (error) {
      console.error("Failed to load profile:", error);
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={<Icon28SettingsOutline />}
        >
          Ошибка загрузки профиля
        </Snackbar>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateToken = async () => {
    try {
      setUpdatingToken(true);
      const response = await profileApi.updateToken();
      setProfile((prev) =>
        prev ? { ...prev, apiKey: response.newApiKey } : null
      );
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={<Icon28RefreshOutline />}
        >
          API ключ успешно обновлен
        </Snackbar>
      );
    } catch (error) {
      console.error("Failed to update token:", error);
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={<Icon28SettingsOutline />}
        >
          Ошибка обновления ключа
        </Snackbar>
      );
    } finally {
      setUpdatingToken(false);
    }
  };

  const getCodeExample = () => {
    const apiKey = profile?.apiKey || "YOUR_API_KEY";
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

    let code = "";
    let language = "";

    switch (activeCodeExample) {
      case "curl":
        code = `curl -X POST "${baseUrl}/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "Привет!"}
    ]
  }'`;
        language = "bash";
        break;

      case "python":
        code = `import requests

url = "${baseUrl}/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${apiKey}"
}
data = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {"role": "user", "content": "Привет!"}
    ]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;
        language = "python";
        break;

      case "js":
        code = `const response = await fetch('${baseUrl}/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: 'Привет!' }
    ]
  })
});

const data = await response.json();
console.log(data);`;
        language = "javascript";
        break;

      default:
        return "";
    }

    return createCodeHTML(code, language);
  };

  const getRawCodeExample = () => {
    const apiKey = profile?.apiKey || "YOUR_API_KEY";
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

    switch (activeCodeExample) {
      case "curl":
        return `curl -X POST "${baseUrl}/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "Привет!"}
    ]
  }'`;

      case "python":
        return `import requests

url = "${baseUrl}/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${apiKey}"
}
data = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {"role": "user", "content": "Привет!"}
    ]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;

      case "js":
        return `const response = await fetch('${baseUrl}/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: 'Привет!' }
    ]
  })
});

const data = await response.json();
console.log(data);`;

      default:
        return "";
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    // Добавляем обработчики для кнопок копирования в блоках кода
    const handleCopyButtons = () => {
      const copyButtons = document.querySelectorAll("[data-copy-mock]");
      copyButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const codeBlock = button.closest("[data-pre-container]");
          if (codeBlock) {
            const codeElement = codeBlock.querySelector("code");
            if (codeElement) {
              navigator.clipboard.writeText(codeElement.textContent || "");
              setSnackbar(
                <Snackbar
                  onClose={() => setSnackbar(null)}
                  before={<Icon28CopyOutline />}
                >
                  Код скопирован
                </Snackbar>
              );
            }
          }
        });
      });
    };

    // Добавляем обработчики после рендера кода
    setTimeout(handleCopyButtons, 100);
  }, [activeCodeExample]);

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader>Профиль</PanelHeader>
        <Placeholder>
          <ScreenSpinner />
        </Placeholder>
      </Panel>
    );
  }

  if (!profile || !vkData) {
    return (
      <Panel id={id}>
        <PanelHeader>Профиль</PanelHeader>
        <Placeholder>Не удалось загрузить данные профиля</Placeholder>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>

      <Group>
        <Card mode="shadow">
          <Div>
            <Title level="3">Баланс</Title>
            <Spacing size={12} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                background: "var(--vkui--color_background_secondary)",
                borderRadius: "8px",
              }}
            >
              <Icon28MoneySendOutline />
              <div>
                <Title level="1">{profile.balance}₽</Title>
                <div style={{ color: "#9c9c9c", fontSize: "14px" }}>
                  Доступно для использования
                </div>
              </div>
            </div>
            <Spacing size={16} />
            <Button size="m" mode="outline" style={{ width: "100%" }}>
              Пополнить баланс
            </Button>
          </Div>
        </Card>
      </Group>

      {/* API Key */}
      <Group>
        <Card mode="shadow">
          <Div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title level="3">API Ключ</Title>
              <Button
                size="s"
                mode="tertiary"
                before={<Icon28OnOffOutline />}
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? "Скрыть" : "Показать"}
              </Button>
            </div>
            <Spacing size={12} />
            <div
              style={{
                padding: "16px",
                background: "var(--vkui--color_background_secondary)",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "14px",
                wordBreak: "break-all",
                border: "1px solid var(--vkui--color_separator_primary)",
                position: "relative",
              }}
            >
              {showApiKey ? profile.apiKey : "•".repeat(profile.apiKey.length)}
            </div>
            <Spacing size={12} />
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                size="m"
                mode="outline"
                before={<Icon28CopyOutline />}
                onClick={() => {
                  navigator.clipboard.writeText(profile.apiKey);
                  setSnackbar(
                    <Snackbar
                      onClose={() => setSnackbar(null)}
                      before={<Icon28CopyOutline />}
                    >
                      API ключ скопирован
                    </Snackbar>
                  );
                }}
              >
                Копировать
              </Button>
              <Button
                size="m"
                mode="outline"
                before={<Icon28RefreshOutline />}
                loading={updatingToken}
                onClick={handleUpdateToken}
              >
                Обновить
              </Button>
            </div>
          </Div>
        </Card>
      </Group>

      {/* Code Examples */}
      <Group>
        <Card mode="shadow">
          <Div>
            <Title level="3">Примеры использования</Title>
            <Spacing size={12} />

            {/* Language Tabs */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <Button
                size="s"
                mode={activeCodeExample === "curl" ? "primary" : "outline"}
                onClick={() => setActiveCodeExample("curl")}
              >
                cURL
              </Button>
              <Button
                size="s"
                mode={activeCodeExample === "python" ? "primary" : "outline"}
                onClick={() => setActiveCodeExample("python")}
              >
                Python
              </Button>
              <Button
                size="s"
                mode={activeCodeExample === "js" ? "primary" : "outline"}
                onClick={() => setActiveCodeExample("js")}
              >
                JavaScript
              </Button>
            </div>

            {/* Code Block */}
            <div
              className="code-block"
              style={{
                overflow: "auto",
              }}
              dangerouslySetInnerHTML={{ __html: getCodeExample() }}
            />

            {/* Add CSS styles */}
            <style>{getCodeStyles()}</style>

            <Spacing size={12} />

            {/* Copy Code Button */}
            <Button
              size="m"
              mode="outline"
              before={<Icon28CopyOutline />}
              onClick={() => {
                navigator.clipboard.writeText(getRawCodeExample());
                setSnackbar(
                  <Snackbar
                    onClose={() => setSnackbar(null)}
                    before={<Icon28CopyOutline />}
                  >
                    Код скопирован
                  </Snackbar>
                );
              }}
              style={{ width: "100%" }}
            >
              Копировать код
            </Button>

            <Spacing size={12} />

            {/* Documentation Link */}
            <div style={{ textAlign: "center" }}>
              <Button
                size="s"
                mode="tertiary"
                before={<Icon28LinkOutline />}
                onClick={() =>
                  window.open("https://docs.openai.com/api", "_blank")
                }
              >
                Открыть документацию
              </Button>
            </div>
          </Div>
        </Card>
      </Group>
    </Panel>
  );
};
