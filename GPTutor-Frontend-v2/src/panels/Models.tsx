import { FC, useState, useEffect } from "react";
import {
  Button,
  Card,
  Cell,
  Div,
  Group,
  List,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Spacing,
  Text,
  Title,
  Snackbar,
  Search,
  Spinner,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import {
  Icon16CopyOutline,
  Icon12Check,
  Icon12Cancel,
  Icon16Message,
  Icon16ArrowTriangleDown,
  Icon16ArrowTriangleUp,
} from "@vkontakte/icons";
import {
  GeminiIcon,
  QwenIcon,
  DeepSeekIcon,
  GrokIcon,
  OpenAIIcon,
  MistralIcon,
} from "../components/icons";
import {
  modelsApi,
  ProcessedModel,
  formatContextLength,
  formatModalities,
  processModelData,
} from "../api";
import "./module.css";

export interface ModelsProps extends NavIdProps {}

export const Models: FC<ModelsProps> = ({ id }) => {
  const navigator = useRouteNavigator();
  const [models, setModels] = useState<ProcessedModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<ProcessedModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [snackbar, setSnackbar] = useState<React.ReactNode>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(false);

  // Функция сортировки по цене
  const sortModelsByPrice = (
    modelsToSort: ProcessedModel[],
    order: "asc" | "desc"
  ) => {
    return [...modelsToSort].sort((a, b) => {
      // Извлекаем числовое значение цены
      const getPriceValue = (price: string) => {
        if (price === "Бесплатно") return 0;
        const match = price.match(/(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
      };

      const priceA = getPriceValue(a.price);
      const priceB = getPriceValue(b.price);

      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
  };

  // Функция фильтрации моделей
  const filterModels = (query: string) => {
    let filtered = models;

    if (query.trim()) {
      filtered = models.filter((model) =>
        model.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Всегда применяем сортировку
    filtered = sortModelsByPrice(filtered, sortOrder);

    setFilteredModels(filtered);
  };

  // Обработчик изменения поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterModels(value);
  };

  // Функция быстрого поиска
  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    filterModels(query);
  };

  // Обработчик переключения сортировки
  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Применяем сортировку при изменении sortOrder
  useEffect(() => {
    filterModels(searchQuery);
  }, [sortOrder]);

  // Функция для получения иконки модели (маленькая)
  const getModelIconSmall = (modelName: string) => {
    if (modelName.includes("gemini")) {
      return <GeminiIcon size={16} />;
    } else if (modelName.includes("qwen")) {
      return <QwenIcon size={16} />;
    } else if (modelName.includes("deepseek")) {
      return <DeepSeekIcon size={16} />;
    } else if (modelName.includes("grok")) {
      return <GrokIcon size={16} />;
    } else if (modelName.includes("gpt") || modelName.includes("openai")) {
      return <OpenAIIcon size={16} />;
    } else if (modelName.includes("mistral")) {
      return <MistralIcon size={16} />;
    }
    return null;
  };

  const getModelIcon = (modelName: string) => {
    const name = modelName.toLowerCase();

    if (name.includes("gemini")) {
      return <GeminiIcon size={24} />;
    } else if (name.includes("qwen")) {
      return <QwenIcon size={24} />;
    } else if (name.includes("deepseek")) {
      return <DeepSeekIcon size={24} />;
    } else if (name.includes("grok")) {
      return <GrokIcon size={24} />;
    } else if (name.includes("gpt") || name.includes("openai")) {
      return <OpenAIIcon size={24} />;
    } else if (name.includes("mistral")) {
      return <MistralIcon size={24} />;
    }
    return null;
  };

  // Функция для копирования ID модели
  const copyModelId = (modelId: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = modelId;
      textArea.className = "hidden-textarea";
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);

      const successful = document.execCommand("copy");
      textArea.remove();

      if (successful) {
        setSnackbar(
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={<Icon12Check />}
            className="snackbar-margin"
          >
            ID скопирован: {modelId}
          </Snackbar>
        );
      } else {
        throw new Error("Copy failed");
      }
    } catch (err) {
      console.error("Copy error:", err);
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={<Icon12Cancel />}
          className="snackbar-margin"
        >
          Не удалось скопировать
        </Snackbar>
      );
    }
  };

  // Функция для попробовать модель
  const tryModel = (modelId: string) => {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<div>🚀</div>}
        className="snackbar-margin"
      >
        Попробовать модель: {modelId}
      </Snackbar>
    );
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const data = await modelsApi.getModels();

        if (data.success && data.data.models) {
          const processedModels: ProcessedModel[] = data.data.models
            .slice(0, 50) // Show first 50 models
            .map(processModelData);

          setModels(processedModels);
          setFilteredModels(processedModels);
        } else {
          setSnackbar(
            <Snackbar
              onClose={() => setSnackbar(null)}
              before={<Icon12Cancel />}
              className="snackbar-margin"
            >
              Неожиданная структура ответа API
            </Snackbar>
          );
        }
      } catch (error) {
        console.error("Error fetching models:", error);
        setSnackbar(
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={<Icon12Cancel />}
            className="snackbar-margin"
          >
            Ошибка загрузки моделей:{" "}
            {error instanceof Error ? error.message : "Неизвестная ошибка"}
          </Snackbar>
        );
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => navigator.push("/")} />}
      >
        Модели
      </PanelHeader>

      {loading ? (
        <Group>
          <Div className="loading-container">
            <Spinner size="m" />
          </Div>
        </Group>
      ) : (
        <>
          <Group>
            <Div>
              <Title level="1">Доступные модели</Title>
              <Spacing size={8} />
              <Text>
                Выберите подходящую модель для ваших задач. Все модели работают
                через единый API.
              </Text>
            </Div>
          </Group>

          <Group className="search-group">
            <div className="search-container">
              <Search
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Поиск по названию модели..."
                className="search-input"
              />
              <div className="sort-button" onClick={handleSortToggle}>
                {sortOrder === "asc" ? (
                  <Icon16ArrowTriangleUp />
                ) : (
                  <Icon16ArrowTriangleDown />
                )}
              </div>
            </div>

            {/* Плашки для быстрого поиска */}
            <div className="quick-search-container">
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("gpt")}
                className="quick-search-button"
              >
                <div className="model-icon-container">
                  {getModelIconSmall("gpt")}
                </div>
                <span>GPT</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("deepseek")}
                className="quick-search-button"
              >
                <div className="model-icon-container">
                  {getModelIconSmall("deepseek")}
                </div>
                <span>DeepSeek</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("grok")}
                className="quick-search-button"
              >
                <div className="model-icon-container">
                  {getModelIconSmall("grok")}
                </div>
                <span>Grok</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("gemini")}
                className="quick-search-button"
              >
                <div className="model-icon-container">
                  {getModelIconSmall("gemini")}
                </div>
                <span>Gemini</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("mistral")}
                className="quick-search-button"
              >
                <div className="model-icon-container">
                  {getModelIconSmall("mistral")}
                </div>
                <span>Mistral</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("qwen")}
                className="quick-search-button"
              >
                <div className="model-icon-container">
                  {getModelIconSmall("qwen")}
                </div>
                <span>Qwen</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("")}
                className="all-models-button"
              >
                Все модели
              </Button>
            </div>

            <List className="models-list">
              {filteredModels.map((model) => (
                <Card
                  key={model.id}
                  mode="outline"
                  className="model-card-wrapper"
                >
                  <Cell className="model-cell">
                    <div className="model-card model-card-inner">
                      {/* Верхняя часть: иконка + название + кнопка копирования */}
                      <div className="model-card-top model-card-top-inner">
                        <div className="model-icon-container-large">
                          {getModelIcon(model.name)}
                        </div>
                        <div className="model-title-container">
                          <div className="model-title-block">
                            <div className="model-title-row">
                              <Title
                                level="3"
                                className="model-name model-title-text"
                              >
                                {model.name}
                              </Title>
                              <button
                                className="model-copy-button"
                                onClick={() => copyModelId(model.id)}
                              >
                                <Icon16CopyOutline className="model-copy-icon" />
                              </button>
                            </div>
                            {/* Контекст и модальности под названием */}
                            <Text className="model-context-info model-context-info-text">
                              {formatContextLength(model.contextLength)} context
                              • {formatModalities(model.inputModalities)}
                            </Text>
                          </div>
                        </div>
                      </div>

                      {/* Контекст и модальности для мобильной версии */}
                      <Text className="model-context-mobile model-context-mobile-text">
                        {formatContextLength(model.contextLength)} context •{" "}
                        {formatModalities(model.inputModalities)}
                      </Text>

                      {/* Нижняя часть: цена + кнопка */}
                      <div className="model-card-bottom model-card-bottom-inner">
                        <div className="model-price-section model-price-section-inner">
                          <Text
                            weight="2"
                            className={`model-price-text ${
                              model.price === "Бесплатно" ? "free" : "paid"
                            }`}
                          >
                            {model.price}
                          </Text>
                          {model.price !== "Бесплатно" && (
                            <Text className="model-price-unit">
                              за 1М токенов
                            </Text>
                          )}
                        </div>
                        <Button
                          size="s"
                          mode="outline"
                          onClick={() => tryModel(model.id)}
                          before={<Icon16Message />}
                        >
                          Попробовать
                        </Button>
                      </div>
                    </div>
                  </Cell>
                </Card>
              ))}
            </List>
          </Group>
        </>
      )}
      {snackbar}
    </Panel>
  );
};
