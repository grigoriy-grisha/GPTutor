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

import { Icon16CopyOutline, Icon12Check, Icon12Cancel, Icon16Message, Icon16ArrowTriangleDown, Icon16ArrowTriangleUp } from "@vkontakte/icons";
import { GeminiIcon, QwenIcon, DeepSeekIcon, GrokIcon, OpenAIIcon, MistralIcon } from "../components/icons";
import { modelsApi, ProcessedModel, formatContextLength, formatModalities, processModelData } from "../api";

export interface ModelsProps extends NavIdProps {}

export const Models: FC<ModelsProps> = ({ id }) => {
  const navigator = useRouteNavigator();
  const [models, setModels] = useState<ProcessedModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<ProcessedModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [snackbar, setSnackbar] = useState<React.ReactNode>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState<boolean>(false);

  // Функция сортировки по цене
  const sortModelsByPrice = (modelsToSort: ProcessedModel[], order: 'asc' | 'desc') => {
    return [...modelsToSort].sort((a, b) => {
      // Извлекаем числовое значение цены
      const getPriceValue = (price: string) => {
        if (price === "Бесплатно") return 0;
        const match = price.match(/(\d+\.?\d*)/);
        return match ? parseFloat(match[1]) : 0;
      };
      
      const priceA = getPriceValue(a.price);
      const priceB = getPriceValue(b.price);
      
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
  };

  // Функция фильтрации моделей
  const filterModels = (query: string) => {
    let filtered = models;
    
    if (query.trim()) {
      filtered = models.filter(model => 
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
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Применяем сортировку при изменении sortOrder
  useEffect(() => {
    filterModels(searchQuery);
  }, [sortOrder]);


  // Функция для получения иконки модели (маленькая)
  const getModelIconSmall = (modelName: string) => {
    if (modelName.includes('gemini')) {
      return <GeminiIcon size={16} />;
    } else if (modelName.includes('qwen')) {
      return <QwenIcon size={16} />;
    } else if (modelName.includes('deepseek')) {
      return <DeepSeekIcon size={16} />;
    } else if (modelName.includes('grok')) {
      return <GrokIcon size={16} />;
    } else if (modelName.includes('gpt') || modelName.includes('openai')) {
      return <OpenAIIcon size={16} />;
    } else if (modelName.includes('mistral')) {
      return <MistralIcon size={16} />;
    }
    return null;
  };

  const getModelIcon = (modelName: string) => {
    const name = modelName.toLowerCase();
    
    if (name.includes('gemini')) {
      return <GeminiIcon size={24} />;
    } else if (name.includes('qwen')) {
      return <QwenIcon size={24} />;
    } else if (name.includes('deepseek')) {
      return <DeepSeekIcon size={24} />;
    } else if (name.includes('grok')) {
      return <GrokIcon size={24} />;
    } else if (name.includes('gpt') || name.includes('openai')) {
      return <OpenAIIcon size={24} />;
    } else if (name.includes('mistral')) {
      return <MistralIcon size={24} />;
    }
    return null;
  };

  // Функция для копирования ID модели
  const copyModelId = (modelId: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = modelId;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      
      const successful = document.execCommand('copy');
      textArea.remove();
      
      if (successful) {
        setSnackbar(
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={<Icon12Check />}
            style={{ marginBottom: '60px' }}
          >
            ID скопирован: {modelId}
          </Snackbar>
        );
      } else {
        throw new Error('Copy failed');
      }
    } catch (err) {
      console.error('Copy error:', err);
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          before={<Icon12Cancel />}
          style={{ marginBottom: '60px' }}
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
        style={{ marginBottom: '60px' }}
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
              style={{ marginBottom: '60px' }}
            >
              Неожиданная структура ответа API
            </Snackbar>
          );
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        setSnackbar(
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={<Icon12Cancel />}
            style={{ marginBottom: '60px' }}
          >
            Ошибка загрузки моделей: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
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
      <style>
        {`
          /* Убираем полосу прокрутки */
          body, html {
            overflow-x: hidden !important;
          }
          
          /* Стили для иконок - как в Home.tsx */
          .model-icon-container {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #f0f2f5;
            padding: 2px;
          }
          
          .model-icon-container-large {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #f0f2f5;
            padding: 2px;
          }
          
          .vkuiButton__content {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            width: 100% !important;
          }
          
          .vkuiCard__host {
            width: calc(100% - 20px) !important;
            max-width: none !important;
            min-width: 0 !important;
            margin-left: 10px !important;
            margin-right: 10px !important;
          }
          
          .vkuiCard__modeOutline {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
          }
          
          .vkuiCard__withBorder {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
          }
          
          .vkuiSimpleCell__children {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
          }
          
          .vkuiList__host {
            width: 96% !important;
          }
          
          @media (max-width: 460px) {
            .model-name {
              white-space: nowrap !important;
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              max-width: 200px !important;
            }
          }
          
          @media (min-width: 461px) {
            .model-name {
              white-space: normal !important;
              overflow: visible !important;
              text-overflow: unset !important;
              max-width: none !important;
            }
          }
          
          /* Мобильная и планшетная версия (до 768px) - вертикальная структура */
          @media (max-width: 767px) {
            .model-card {
              display: flex !important;
              flex-direction: column !important;
              gap: 12px !important;
            }
            
            .model-card-top {
              display: flex !important;
              align-items: center !important;
              gap: 12px !important;
            }
            
            .model-context-info {
              display: none !important;
            }
            
            .model-context-mobile {
              display: block !important;
            }
            
            .model-card-bottom {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
            }
            
            .vkuiSimpleCell__children {
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
            
            .vkuiSimpleCell {
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
            
            .vkuiCard__modeOutline {
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
          }
          
          /* Десктопная версия (от 768px) - горизонтальная структура */
          @media (min-width: 768px) {
            .model-card {
              display: flex !important;
              flex-direction: row !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
            
            .model-card-top {
              display: flex !important;
              align-items: flex-start !important;
              gap: 12px !important;
              flex: 1 !important;
            }
            
            
            .model-card-bottom {
              display: flex !important;
              flex-direction: column !important;
              align-items: flex-end !important;
              gap: 8px !important;
              justify-content: flex-end !important;
              min-width: 200px !important;
            }
            
            .model-price-section {
              display: flex !important;
              flex-direction: column !important;
              align-items: flex-end !important;
              text-align: right !important;
            }
            
            .model-context-mobile {
              display: none !important;
            }
            
            .model-context-info {
              display: block !important;
              font-size: 16px !important;
              margin-top: 9px !important; /* 4px + 5px = 9px */
            }
            
            .vkuiSimpleCell__children {
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
            
            .vkuiSimpleCell {
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
            
            .vkuiCard__modeOutline {
              padding-left: 5px !important;
              padding-right: 5px !important;
            }
          }
        `}
      </style>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => navigator.push('/')} />}
      >
        Модели
      </PanelHeader>
      
      {loading ? (
        <Group>
          <Div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
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
            Выберите подходящую модель для ваших задач. Все модели работают через единый API.
          </Text>
        </Div>
      </Group>


        <Group style={{ padding: 0, margin: 0 }}>
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '80%',
            margin: '10px auto 16px auto'
          }}>
            <Search
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Поиск по названию модели..."
              style={{ flex: 1, maxWidth: '90%' }}
            />
            <div
              style={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={handleSortToggle}
            >
              {sortOrder === 'asc' ? <Icon16ArrowTriangleUp /> : <Icon16ArrowTriangleDown />}
            </div>
            {/* <Button
              size="s"
              mode="primary"
              style={{ 
                minWidth: '32px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0'
              }}
            >
            </Button> */}
          </div>
          
          {/* Плашки для быстрого поиска */}
          <div           style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '12px', 
            marginBottom: '16px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button
              size="s"
              mode="outline"
              onClick={() => handleQuickSearch('gpt')}
              style={{ 
                fontSize: '12px',
                borderRadius: '20px',
                padding: '8px 16px',
                height: '36px',
                minWidth: '80px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div className="model-icon-container">
                {getModelIconSmall('gpt')}
              </div>
              <span>GPT</span>
            </Button>
            <Button
              size="s"
              mode="outline"
              onClick={() => handleQuickSearch('deepseek')}
              style={{ 
                fontSize: '12px',
                borderRadius: '20px',
                padding: '8px 16px',
                height: '36px',
                minWidth: '80px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div className="model-icon-container">
                {getModelIconSmall('deepseek')}
              </div>
              <span>DeepSeek</span>
            </Button>
            <Button
              size="s"
              mode="outline"
              onClick={() => handleQuickSearch('grok')}
              style={{ 
                fontSize: '12px',
                borderRadius: '20px',
                padding: '8px 16px',
                height: '36px',
                minWidth: '80px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div className="model-icon-container">
                {getModelIconSmall('grok')}
              </div>
              <span>Grok</span>
            </Button>
            <Button
              size="s"
              mode="outline"
              onClick={() => handleQuickSearch('gemini')}
              style={{ 
                fontSize: '12px',
                borderRadius: '20px',
                padding: '8px 16px',
                height: '36px',
                minWidth: '80px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div className="model-icon-container">
                {getModelIconSmall('gemini')}
              </div>
              <span>Gemini</span>
            </Button>
            <Button
              size="s"
              mode="outline"
              onClick={() => handleQuickSearch('mistral')}
              style={{ 
                fontSize: '12px',
                borderRadius: '20px',
                padding: '8px 16px',
                height: '36px',
                minWidth: '80px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div className="model-icon-container">
                {getModelIconSmall('mistral')}
              </div>
              <span>Mistral</span>
            </Button>
            <Button
              size="s"
              mode="outline"
              onClick={() => handleQuickSearch('qwen')}
              style={{ 
                fontSize: '12px',
                borderRadius: '20px',
                padding: '8px 16px',
                height: '36px',
                minWidth: '80px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <div className="model-icon-container">
                {getModelIconSmall('qwen')}
              </div>
              <span>Qwen</span>
            </Button>
            <Button
              size="s"
              mode="outline"
              onClick={() => handleQuickSearch('')}
              style={{ 
                fontSize: '10px',
                borderRadius: '16px',
                padding: '4px 12px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Все модели
            </Button>
          </div>
          
          <List style={{ width: '100%', padding: 0 }}>
            {filteredModels.map((model) => (
            <Card key={model.id} mode="outline" style={{ marginBottom: '8px', width: '100%', margin: '0 0 8px 0' }}>
        <Cell style={{ padding: '16px', width: '100%', margin: 0 }}>
          <div className="model-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Верхняя часть: иконка + название + кнопка копирования */}
            <div className="model-card-top" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px'
            }}>
              <div className="model-icon-container-large">
                {getModelIcon(model.name)}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Title level="3" className="model-name" style={{ margin: 0, fontSize: '18px', color: 'var(--vkui--color_text_primary)' }}>
                      {model.name}
                    </Title>
                    <button
                      className="model-copy-button"
                      onClick={() => copyModelId(model.id)}
                      style={{ 
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.6,
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                    >
                      <Icon16CopyOutline style={{ 
                        color: 'var(--vkui--color_text_secondary)',
                        width: '16px',
                        height: '16px'
                      }} />
                    </button>
                  </div>
                  {/* Контекст и модальности под названием */}
                  <Text className="model-context-info" style={{ 
                    color: 'var(--vkui--color_text_secondary)',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    marginTop: '4px'
                  }}>
                    {formatContextLength(model.contextLength)} context • {formatModalities(model.inputModalities)}
                  </Text>
                </div>
              </div>
            </div>

            {/* Контекст и модальности для мобильной версии */}
            <Text className="model-context-mobile" style={{ 
              color: 'var(--vkui--color_text_secondary)',
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              {formatContextLength(model.contextLength)} context • {formatModalities(model.inputModalities)}
            </Text>

            {/* Нижняя часть: цена + кнопка */}
            <div className="model-card-bottom" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div className="model-price-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text weight="2" style={{ 
                  color: model.price === "Бесплатно" 
                    ? "var(--vkui--color_text_positive)" 
                    : "var(--vkui--color_text_primary)",
                  fontSize: '16px'
                }}>
                  {model.price}
                </Text>
                {model.price !== "Бесплатно" && (
                  <Text style={{ 
                    color: 'var(--vkui--color_text_secondary)',
                    fontSize: '11px'
                  }}>
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
