import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Div,
  Flex,
  Group,
  IconButton,
  NavIdProps,
  Panel,
  PanelHeader,
  Placeholder,
  ScreenSpinner,
  SegmentedControl,
  Snackbar,
  Spacing,
  Title,
} from "@vkontakte/vkui";
import {
  Icon28CopyOutline,
  Icon28LinkOutline,
  Icon28MoneySendOutline,
  Icon28RefreshOutline,
  Icon28SettingsOutline,
} from "@vkontakte/icons";
import { profileApi, UserProfile, VkData } from "../api/profileApi";
import { createCodeHTML, getCodeStyles } from "../utils/codeFormatter";
import "../styles/prism.css";
import bridge from "@vkontakte/vk-bridge";
import { userViewModel } from "../viewModels/UserViewModel.ts";

export interface ProfileProps extends NavIdProps {}

export const Profile: FC<ProfileProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vkData, setVkData] = useState<VkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingToken, setUpdatingToken] = useState(false);
  const [, setSnackbar] = useState<React.ReactNode>(null);
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
    const baseUrl = import.meta.env.VITE_API_URL;

    let code = "";
    let language = "";

    switch (activeCodeExample) {
      case "curl":
        code = `curl -X POST "${baseUrl}/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "model": "google/gemini-2.5-flash-lite",
    "messages": [
      {"role": "user", "content": "Привет!"}
    ]
  }'`;
        language = "bash";
        break;

      case "python":
        code = `import requests

url = "${baseUrl}/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${apiKey}"
}
data = {
    "model": "google/gemini-2.5-flash-lite",
    "messages": [
        {"role": "user", "content": "Привет!"}
    ]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;
        language = "python";
        break;

      case "js":
        code = `const response = await fetch('${baseUrl}/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash-lite',
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
        return `curl -X POST "${baseUrl}/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "model": "google/gemini-2.5-flash-lite",
    "messages": [
      {"role": "user", "content": "Привет!"}
    ]
  }'`;

      case "python":
        return `import requests

url = "${baseUrl}/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${apiKey}"
}
data = {
    "model": "google/gemini-2.5-flash-lite",
    "messages": [
        {"role": "user", "content": "Привет!"}
    ]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;

      case "js":
        return `const response = await fetch('${baseUrl}/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash-lite',
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
        <Div>
          <Title level="3">Баланс</Title>
          <Spacing size={12} />
          <Flex
            align="center"
            style={{ flexWrap: "nowrap" }}
            wrap="nowrap"
            gap={6}
          >
            <div
              style={{ width: "100%", fontWeight: 700 }}
              className="code-block"
              dangerouslySetInnerHTML={{
                __html: createCodeHTML(
                  `ID: ${userViewModel.getUserId()}`,
                  "python"
                ),
              }}
            />
            <IconButton
              onClick={() => {
                bridge.send("VKWebAppCopyText", {
                  text: String(userViewModel.getUserId()),
                });
              }}
            >
              <Icon28CopyOutline
                color="var(--vkui--color_background_accent_themed)"
                width={24}
                height={24}
              />
            </IconButton>
          </Flex>
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

          <Button
            size="m"
            mode="outline"
            style={{ width: "100%" }}
            onClick={() => {
              bridge
                .send("VKWebAppShowOrderBox", {
                  type: "item",
                  item: "item_id_123456",
                })
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  // Ошибка
                  console.log(error);
                });
            }}
          >
            Пополнить баланс
          </Button>
        </Div>
      </Group>

      <Group>
        <Div>
          <Title level="3">API Ключ</Title>
          <Spacing size={12} />
          <Flex
            align="center"
            style={{ flexWrap: "nowrap" }}
            wrap="nowrap"
            gap={6}
          >
            <div
              style={{ width: "100%", fontWeight: 700 }}
              className="code-block"
              dangerouslySetInnerHTML={{
                __html: createCodeHTML(profile.apiKey, "python"),
              }}
            />
            <IconButton
              onClick={() => {
                bridge.send("VKWebAppCopyText", {
                  text: profile.apiKey,
                });
              }}
            >
              <Icon28CopyOutline
                color="var(--vkui--color_background_accent_themed)"
                width={24}
                height={24}
              />
            </IconButton>
          </Flex>
          <Spacing size={16} />
          <Button
            style={{ width: "100%" }}
            size="m"
            align="center"
            mode="outline"
            after={<Icon28RefreshOutline width={24} height={24} />}
            loading={updatingToken}
            onClick={handleUpdateToken}
          >
            Перегенерировать
          </Button>
        </Div>
      </Group>

      <Group>
        <Div>
          <Title level="3">Примеры использования</Title>
          <Spacing size={12} />
          <SegmentedControl
            value={activeCodeExample}
            onChange={(value) => setActiveCodeExample(value as any)}
            options={[
              {
                label: "Curl",
                value: "curl",
              },
              {
                label: "Python",
                value: "python",
              },
              {
                label: "JavaScript",
                value: "js",
              },
            ]}
          />
          <Spacing size={16} />
          <div
            className="code-block"
            style={{
              overflow: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: getCodeExample() }}
          />

          <style>{getCodeStyles()}</style>

          <Spacing size={16} />

          <Flex align="center" gap={12} style={{ flexWrap: "nowrap" }}>
            <Button
              size="m"
              mode="outline"
              onClick={() => {
                bridge.send("VKWebAppCopyText", {
                  text: getRawCodeExample(),
                });
              }}
              after={<Icon28CopyOutline />}
              style={{ width: "100%" }}
            >
              Копировать код
            </Button>
            <Button
              target="_blank"
              href="https://docs.giga-router.ru/"
              size="m"
              mode="outline"
              after={<Icon28LinkOutline />}
              style={{ width: "100%" }}
            >
              Документация
            </Button>
          </Flex>
        </Div>
      </Group>
    </Panel>
  );
};
