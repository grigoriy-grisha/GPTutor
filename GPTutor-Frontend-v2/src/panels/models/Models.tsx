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
  ClaudeIcon,
  PerplexityIcon,
} from "../../components/icons";
import {
  modelsApi,
  ProcessedModel,
  formatContextLength,
  formatModalities,
  processModelData,
} from "../../api";
import classes from "./Models.module.css";

export interface ModelsProps extends NavIdProps {}

export const Models: FC<ModelsProps> = ({ id }) => {
  const navigator = useRouteNavigator();
  const [models, setModels] = useState<ProcessedModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<ProcessedModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [snackbar, setSnackbar] = useState<React.ReactNode>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(false);

  const sortModelsByPrice = (
    modelsToSort: ProcessedModel[],
    order: "asc" | "desc"
  ) => {
    return [...modelsToSort].sort((a, b) => {
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

  const filterModels = (query: string) => {
    let filtered = models;

    if (query.trim()) {
      filtered = models.filter((model) =>
        model.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    filtered = sortModelsByPrice(filtered, sortOrder);

    setFilteredModels(filtered);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterModels(value);
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    filterModels(query);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    filterModels(searchQuery);
  }, [sortOrder]);

  const getModelIconSmall = (modelName: string) => {
    if (modelName.includes("gemini")) {
      return <GeminiIcon size={16} />;
    } else if (modelName.includes("qwen")) {
      return <QwenIcon size={16} />;
    } else if (modelName.includes("deepseek")) {
      return <DeepSeekIcon size={20} />;
    } else if (modelName.includes("grok")) {
      return <GrokIcon size={16} />;
    } else if (modelName.includes("gpt") || modelName.includes("openai")) {
      return <OpenAIIcon size={16} />;
    } else if (modelName.includes("mistral")) {
      return <MistralIcon size={16} />;
    } else if (modelName.includes("perplexity")) {
      return <PerplexityIcon size={16} />;
    }
    return null;
  };

  const getModelIcon = (modelName: string) => {
    const name = modelName.toLowerCase();

    if (name.includes("google")) {
      return <GeminiIcon size={24} />;
    } else if (name.includes("qwen")) {
      return <QwenIcon size={24} />;
    } else if (name.includes("deepseek")) {
      return <DeepSeekIcon size={30} />;
    } else if (name.includes("grok")) {
      return <GrokIcon size={24} />;
    } else if (name.includes("gpt") || name.includes("openai")) {
      return <OpenAIIcon size={24} />;
    } else if (name.includes("mistral")) {
      return <MistralIcon size={24} />;
    } else if (name.includes("anthropic")) {
      return <ClaudeIcon />;
    } else if (name.includes("perplexity")) {
      return <PerplexityIcon />;
    }
    return null;
  };

  const copyModelId = (modelId: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = modelId;
      textArea.className = classes.hiddenTextarea;
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
            className={classes.snackbarMargin}
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
          className={classes.snackbarMargin}
        >
          Не удалось скопировать
        </Snackbar>
      );
    }
  };

  const tryModel = (modelId: string) => {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<div>🚀</div>}
        className={classes.snackbarMargin}
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
          const processedModels: ProcessedModel[] =
            data.data.models.map(processModelData);

          setModels(processedModels);
          setFilteredModels(processedModels);
        } else {
          setSnackbar(
            <Snackbar
              onClose={() => setSnackbar(null)}
              before={<Icon12Cancel />}
              className={classes.snackbarMargin}
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
            className={classes.snackbarMargin}
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
    <Panel id={id} className={classes.modelsPanel}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => navigator.push("/")} />}
      >
        Модели
      </PanelHeader>

      {loading ? (
        <Group>
          <Div className={classes.loadingContainer}>
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

          <Group className={classes.searchGroup}>
            <div className={classes.searchContainer}>
              <Search
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Поиск по названию модели..."
                className={classes.searchInput}
              />
              <div className={classes.sortButton} onClick={handleSortToggle}>
                {sortOrder === "asc" ? (
                  <Icon16ArrowTriangleUp />
                ) : (
                  <Icon16ArrowTriangleDown />
                )}
              </div>
            </div>

            <div className={classes.quickSearchContainer}>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("gpt")}
                className={classes.quickSearchButton}
              >
                <div className={classes.modelIconContainer}>
                  {getModelIconSmall("gpt")}
                </div>
                <span>GPT</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("deepseek")}
                className={classes.quickSearchButton}
              >
                <div className={classes.modelIconContainer}>
                  {getModelIconSmall("deepseek")}
                </div>
                <span>DeepSeek</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("grok")}
                className={classes.quickSearchButton}
              >
                <div className={classes.modelIconContainer}>
                  {getModelIconSmall("grok")}
                </div>
                <span>Grok</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("gemini")}
                className={classes.quickSearchButton}
              >
                <div className={classes.modelIconContainer}>
                  {getModelIconSmall("gemini")}
                </div>
                <span>Gemini</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("mistral")}
                className={classes.quickSearchButton}
              >
                <div className={classes.modelIconContainer}>
                  {getModelIconSmall("mistral")}
                </div>
                <span>Mistral</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("qwen")}
                className={classes.quickSearchButton}
              >
                <div className={classes.modelIconContainer}>
                  {getModelIconSmall("qwen")}
                </div>
                <span>Qwen</span>
              </Button>
              <Button
                size="s"
                mode="outline"
                onClick={() => handleQuickSearch("")}
                className={classes.allModelsButton}
              >
                Все модели
              </Button>
            </div>

            <List className={classes.modelsList}>
              {filteredModels.map((model) => (
                <Card
                  key={model.id}
                  mode="outline"
                  className={classes.modelCardWrapper}
                >
                  <Cell className={classes.modelCell}>
                    <div
                      className={`${classes.modelCard} ${classes.modelCardInner}`}
                    >
                      <div
                        className={`${classes.modelCardTop} ${classes.modelCardTopInner}`}
                      >
                        <div className={classes.modelIconContainerLarge}>
                          {getModelIcon(model.name)}
                        </div>
                        <div className={classes.modelTitleContainer}>
                          <div className={classes.modelTitleBlock}>
                            <div className={classes.modelTitleRow}>
                              <Title
                                level="3"
                                className={`${classes.modelName} ${classes.modelTitleText}`}
                              >
                                {model.name}
                              </Title>
                              <button
                                className={classes.modelCopyButton}
                                onClick={() => copyModelId(model.id)}
                              >
                                <Icon16CopyOutline
                                  className={classes.modelCopyIcon}
                                />
                              </button>
                            </div>
                            <Text
                              className={`${classes.modelContextInfo} ${classes.modelContextInfoText}`}
                            >
                              {formatContextLength(model.contextLength)} context
                              • {formatModalities(model.inputModalities)}
                            </Text>
                          </div>
                        </div>
                      </div>

                      <Text
                        className={`${classes.modelContextMobile} ${classes.modelContextMobileText}`}
                      >
                        {formatContextLength(model.contextLength)} context •{" "}
                        {formatModalities(model.inputModalities)}
                      </Text>

                      <div
                        className={`${classes.modelCardBottom} ${classes.modelCardBottomInner}`}
                      >
                        <div
                          className={`${classes.modelPriceSection} ${classes.modelPriceSectionInner}`}
                        >
                          <Text
                            weight="2"
                            className={`${classes.modelPriceText} ${
                              model.price === "Бесплатно"
                                ? classes.free
                                : classes.paid
                            }`}
                          >
                            {model.price}
                          </Text>
                          {model.price !== "Бесплатно" && (
                            <Text className={classes.modelPriceUnit}>
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
