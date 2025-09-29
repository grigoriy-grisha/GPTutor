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
  IconButton,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon16CopyOutline, Icon12Check, Icon12Cancel, Icon16Message, Icon16ArrowTriangleDown, Icon16ArrowTriangleUp, Icon20SortOutline } from "@vkontakte/icons";
import responseData from "./response (4).json";

export interface ModelsProps extends NavIdProps {}

interface ModelData {
  id: string;
  name: string;
  description: string;
  pricing: {
    prompt: number;
    completion: number;
  };
  context_length: number;
  architecture: {
    modality: string;
    input_modalities: string[];
    output_modalities: string[];
  };
}

interface ProcessedModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  price: string;
  contextLength: number;
  inputModalities: string[];
  isPopular: boolean;
}

export const Models: FC<ModelsProps> = ({ id }) => {
  const navigator = useRouteNavigator();
  const [models, setModels] = useState<ProcessedModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<ProcessedModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [snackbar, setSnackbar] = useState<React.ReactNode>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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


  // Функция для получения иконки модели
  const getModelIconSmall = (modelName: string) => {
    if (modelName.includes('gemini')) {
      return <svg width="16" height="16" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <mask id="maskme" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="65" height="65">
          <path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="#000"/>
          <path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="url(#prefix__paint0_linear_2001_67)"/>
        </mask>
        <g mask="url(#maskme)">
          <g filter="url(#prefix__filter0_f_2001_67)">
            <path d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z" fill="#FFE432"/>
          </g>
          <g filter="url(#prefix__filter1_f_2001_67)">
            <path d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z" fill="#FC413D"/>
          </g>
          <g filter="url(#prefix__filter2_f_2001_67)">
            <path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"/>
          </g>
          <g filter="url(#prefix__filter3_f_2001_67)">
            <path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"/>
          </g>
          <g filter="url(#prefix__filter4_f_2001_67)">
            <path d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z" fill="#00B95C"/>
          </g>
          <g filter="url(#prefix__filter5_f_2001_67)">
            <path d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z" fill="#3186FF"/>
          </g>
          <g filter="url(#prefix__filter6_f_2001_67)">
            <path d="M-13.065 40.944c9.33 7.094 22.959 4.869 30.442-4.972 7.483-9.84 5.987-23.569-3.343-30.663C4.704-1.786-8.924.439-16.408 10.28c-7.483 9.84-5.986 23.57 3.343 30.664z" fill="#FBBC04"/>
          </g>
          <g filter="url(#prefix__filter7_f_2001_67)">
            <path d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z" fill="#3186FF"/>
          </g>
          <g filter="url(#prefix__filter8_f_2001_67)">
            <path d="M54.984-2.336c2.833 3.852-.808 11.34-8.131 16.727-7.324 5.387-15.557 6.631-18.39 2.78-2.833-3.853.807-11.342 8.13-16.728 7.324-5.387 15.558-6.631 18.39-2.78z" fill="#749BFF"/>
          </g>
          <g filter="url(#prefix__filter9_f_2001_67)">
            <path d="M31.727 16.104C43.053 5.598 46.94-8.626 40.41-15.666c-6.53-7.04-21.006-4.232-32.332 6.274s-15.214 24.73-8.683 31.77c6.53 7.04 21.006 4.232 32.332-6.274z" fill="#FC413D"/>
          </g>
          <g filter="url(#prefix__filter10_f_2001_67)">
            <path d="M8.51 53.838c6.732 4.818 14.46 5.55 17.262 1.636 2.802-3.915-.384-10.994-7.116-15.812-6.731-4.818-14.46-5.55-17.261-1.636-2.802 3.915.383 10.994 7.115 15.812z" fill="#FFEE48"/>
          </g>
        </g>
        <defs>
          <filter id="prefix__filter0_f_2001_67" x="-19.824" y="13.152" width="39.274" height="43.217" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="2.46" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter1_f_2001_67" x="-15.001" y="-40.257" width="84.868" height="85.688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="11.891" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter2_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter3_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter4_f_2001_67" x="-19.845" y="15.459" width="79.731" height="81.505" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter5_f_2001_67" x="29.832" y="-11.552" width="75.117" height="73.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="9.606" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter6_f_2001_67" x="-38.583" y="-16.253" width="78.135" height="78.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="8.706" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter7_f_2001_67" x="8.107" y="-5.966" width="78.877" height="77.539" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="7.775" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter8_f_2001_67" x="13.587" y="-18.488" width="56.272" height="51.81" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="6.957" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter9_f_2001_67" x="-15.526" y="-31.297" width="70.856" height="69.306" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="5.876" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter10_f_2001_67" x="-14.168" y="20.964" width="55.501" height="51.571" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="7.273" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <linearGradient id="prefix__paint0_linear_2001_67" x1="18.447" y1="43.42" x2="52.153" y2="15.004" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4893FC"/>
            <stop offset=".27" stopColor="#4893FC"/>
            <stop offset=".777" stopColor="#969DFF"/>
            <stop offset="1" stopColor="#BD99FE"/>
          </linearGradient>
        </defs>
      </svg>;
    } else if (modelName.includes('qwen')) {
      return <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M268.885 28.587a9886.443 9886.443 0 0125.046 44.266 3.833 3.833 0 003.349 1.942h118.443c3.712 0 6.869 2.346 9.514 6.976l31.019 54.826c4.053 7.19 5.12 10.198.512 17.856a1129.453 1129.453 0 00-16.213 27.734l-7.83 14.037c-2.261 4.181-4.757 5.973-.853 10.923l56.576 98.922c3.669 6.422 2.368 10.539-.917 16.427a2813.646 2813.646 0 01-28.48 49.92c-3.392 5.803-7.51 8-14.507 7.893a916.763 916.763 0 00-49.643.342 2.12 2.12 0 00-1.728 1.066 12257.343 12257.343 0 01-57.706 101.12c-3.606 6.251-8.107 7.744-15.467 7.766-21.269.064-42.709.085-64.363.042a11.45 11.45 0 01-9.92-5.781l-28.48-49.557a1.919 1.919 0 00-1.77-1.046H106.283c-6.08.64-11.798-.021-17.174-1.962l-34.197-59.094a11.58 11.58 0 01-.043-11.52l25.75-45.226a4.225 4.225 0 000-4.203 11754.482 11754.482 0 01-40-69.803l-16.854-29.76c-3.413-6.613-3.69-10.581 2.027-20.586 9.92-17.344 19.776-34.667 29.59-51.968 2.815-4.992 6.485-7.126 12.458-7.147 18.41-.078 36.821-.085 55.232-.021a2.651 2.651 0 002.283-1.344L185.216 27.2a10.412 10.412 0 019.003-5.248c11.178-.021 22.464 0 33.77-.128l21.696-.49c7.275-.065 15.446.682 19.2 7.253zm-73.216 8.597a1.281 1.281 0 00-1.109.64l-61.141 106.987a3.347 3.347 0 01-2.88 1.664H69.397c-1.194 0-1.493.533-.874 1.578l123.946 216.662c.534.896.278 1.322-.725 1.344l-59.627.32a4.647 4.647 0 00-4.266 2.474l-28.16 49.28c-.939 1.664-.448 2.518 1.45 2.518l121.942.17c.981 0 1.706.427 2.218 1.302l29.931 52.352c.981 1.728 1.963 1.749 2.965 0l106.795-186.88 16.704-29.483a1.169 1.169 0 011.024-.601 1.17 1.17 0 011.024.601l30.379 53.973a2.599 2.599 0 002.282 1.323l58.944-.427a.846.846 0 00.858-.853.877.877 0 00-.111-.427L414.229 203.2a2.31 2.31 0 010-2.411l6.251-10.816 23.893-42.176c.512-.874.256-1.322-.746-1.322h-247.36c-1.259 0-1.558-.555-.918-1.643l30.592-53.44a2.276 2.276 0 000-2.432L196.8 37.845a1.276 1.276 0 00-1.131-.661zm134.187 171.093c.981 0 1.237.427.725 1.28l-17.749 31.254-55.744 97.813a1.199 1.199 0 01-1.067.619 1.242 1.242 0 01-1.066-.619l-73.664-128.683c-.427-.725-.214-1.109.597-1.152l4.608-.256 143.403-.256h-.043z" fill="url(#prefix__paint0_linear_9_19)"/>
        <defs>
          <linearGradient id="prefix__paint0_linear_9_19" x1="21.323" y1="21.33" x2="46955.3" y2="21.33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6336E7" stopOpacity=".84"/>
            <stop offset="1" stopColor="#6F69F7" stopOpacity=".84"/>
          </linearGradient>
        </defs>
      </svg>;
    } else if (modelName.includes('deepseek')) {
      return <svg width="16" height="16" viewBox="120 0 280 509.64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }} shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
        <path fill="#4D6BFE" fillRule="nonzero" d="M440.898 139.167c-4.001-1.961-5.723 1.776-8.062 3.673-.801.612-1.479 1.407-2.154 2.141-5.848 6.246-12.681 10.349-21.607 9.859-13.048-.734-24.192 3.368-34.04 13.348-2.093-12.307-9.048-19.658-19.635-24.37-5.54-2.449-11.141-4.9-15.02-10.227-2.708-3.795-3.447-8.021-4.801-12.185-.861-2.509-1.725-5.082-4.618-5.512-3.139-.49-4.372 2.142-5.601 4.349-4.925 9.002-6.833 18.921-6.647 28.962.432 22.597 9.972 40.597 28.932 53.397 2.154 1.47 2.707 2.939 2.032 5.082-1.293 4.41-2.832 8.695-4.186 13.105-.862 2.817-2.157 3.429-5.172 2.205-10.402-4.346-19.391-10.778-27.332-18.553-13.481-13.044-25.668-27.434-40.873-38.702a177.614 177.614 0 00-10.834-7.409c-15.512-15.063 2.032-27.434 6.094-28.902 4.247-1.532 1.478-6.797-12.251-6.736-13.727.061-26.285 4.653-42.288 10.777-2.34.92-4.801 1.593-7.326 2.142-14.527-2.756-29.608-3.368-45.367-1.593-29.671 3.305-53.368 17.329-70.788 41.272-20.928 28.785-25.854 61.482-19.821 95.59 6.34 35.943 24.683 65.704 52.876 88.974 29.239 24.123 62.911 35.943 101.32 33.677 23.329-1.346 49.307-4.468 78.607-29.27 7.387 3.673 15.142 5.144 28.008 6.246 9.911.92 19.452-.49 26.839-2.019 11.573-2.449 10.773-13.166 6.586-15.124-33.915-15.797-26.47-9.368-33.24-14.573 17.235-20.39 43.213-41.577 53.369-110.222.8-5.448.121-8.877 0-13.287-.061-2.692.553-3.734 3.632-4.041 8.494-.981 16.742-3.305 24.314-7.471 21.975-12.002 30.84-31.719 32.933-55.355.307-3.612-.061-7.348-3.879-9.245v-.003zM249.4 351.89c-32.872-25.838-48.814-34.352-55.4-33.984-6.155.368-5.048 7.41-3.694 12.002 1.415 4.532 3.264 7.654 5.848 11.634 1.785 2.634 3.017 6.551-1.784 9.493-10.587 6.55-28.993-2.205-29.856-2.635-21.421-12.614-39.334-29.269-51.954-52.047-12.187-21.924-19.267-45.435-20.435-70.542-.308-6.061 1.478-8.207 7.509-9.307 7.94-1.471 16.127-1.778 24.068-.615 33.547 4.9 62.108 19.902 86.054 43.66 13.666 13.531 24.007 29.699 34.658 45.496 11.326 16.778 23.514 32.761 39.026 45.865 5.479 4.592 9.848 8.083 14.035 10.656-12.62 1.407-33.673 1.714-48.075-9.676zm15.899-102.519c.521-2.111 2.421-3.658 4.722-3.658a4.74 4.74 0 011.661.305c.678.246 1.293.614 1.786 1.163.861.859 1.354 2.083 1.354 3.368 0 2.695-2.154 4.837-4.862 4.837a4.748 4.748 0 01-4.738-4.034 5.01 5.01 0 01.077-1.981zm47.208 26.915c-2.606.996-5.2 1.778-7.707 1.88-4.679.244-9.787-1.654-12.556-3.981-4.308-3.612-7.386-5.631-8.679-11.941-.554-2.695-.247-6.858.246-9.246 1.108-5.144-.124-8.451-3.754-11.451-2.954-2.449-6.711-3.122-10.834-3.122-1.539 0-2.954-.673-4.001-1.224-1.724-.856-3.139-3-1.785-5.634.432-.856 2.525-2.939 3.018-3.305 5.6-3.185 12.065-2.144 18.034.244 5.54 2.266 9.727 6.429 15.759 12.307 6.155 7.102 7.263 9.063 10.773 14.39 2.771 4.163 5.294 8.451 7.018 13.348.877 2.561.071 4.74-2.341 6.277-.981.625-2.109 1.044-3.191 1.458z"/>
      </svg>;
    } else if (modelName.includes('grok')) {
      return <svg width="16" height="16" viewBox="0 0 512 492" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M197.76 315.52l170.197-125.803c8.342-6.186 20.267-3.776 24.256 5.803 20.907 50.539 11.563 111.253-30.08 152.939-41.621 41.685-99.562 50.816-152.512 29.994l-57.834 26.816c82.965 56.768 183.701 42.731 246.656-20.33 49.941-50.006 65.408-118.166 50.944-179.627l.128.149c-20.971-90.282 5.162-126.378 58.666-200.17 1.28-1.75 2.56-3.499 3.819-5.291l-70.421 70.507v-.214l-243.883 245.27m-35.072 30.528c-59.563-56.96-49.28-145.088 1.515-195.926 37.568-37.61 99.136-52.97 152.874-30.4l57.707-26.666a166.554 166.554 0 00-39.019-21.334 191.467 191.467 0 00-208.042 41.942c-54.038 54.101-71.04 137.301-41.856 208.298 21.802 53.056-13.931 90.582-49.92 128.47C23.104 463.915 10.304 477.333 0 491.541l162.56-145.386" fill="#000"/>
      </svg>;
    } else if (modelName.includes('gpt') || modelName.includes('openai')) {
      return <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }} fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
        <path d="M474.123 209.81c11.525-34.577 7.569-72.423-10.838-103.904-27.696-48.168-83.433-72.94-137.794-61.414a127.14 127.14 0 00-95.475-42.49c-55.564 0-104.936 35.781-122.139 88.593-35.781 7.397-66.574 29.76-84.637 61.414-27.868 48.167-21.503 108.72 15.826 150.007-11.525 34.578-7.569 72.424 10.838 103.733 27.696 48.34 83.433 73.111 137.966 61.585 24.084 27.18 58.833 42.835 95.303 42.663 55.564 0 104.936-35.782 122.139-88.594 35.782-7.397 66.574-29.76 84.465-61.413 28.04-48.168 21.676-108.722-15.654-150.008v-.172zm-39.567-87.218c11.01 19.267 15.139 41.803 11.354 63.65-.688-.516-2.064-1.204-2.924-1.72l-101.152-58.49a16.965 16.965 0 00-16.687 0L206.621 194.5v-50.232l97.883-56.597c45.587-26.32 103.732-10.666 130.052 34.921zm-227.935 104.42l49.888-28.9 49.887 28.9v57.63l-49.887 28.9-49.888-28.9v-57.63zm23.223-191.81c22.364 0 43.867 7.742 61.07 22.02-.688.344-2.064 1.204-3.097 1.72L186.666 117.26c-5.161 2.925-8.258 8.43-8.258 14.45v136.934l-43.523-25.116V130.333c0-52.64 42.491-95.13 95.131-95.302l-.172.172zM52.14 168.697c11.182-19.268 28.557-34.062 49.544-41.803V247.14c0 6.02 3.097 11.354 8.258 14.45l118.354 68.295-43.695 25.288-97.711-56.425c-45.415-26.32-61.07-84.465-34.75-130.052zm26.665 220.71c-11.182-19.095-15.139-41.802-11.354-63.65.688.516 2.064 1.204 2.924 1.72l101.152 58.49a16.965 16.965 0 0016.687 0l118.354-68.467v50.232l-97.883 56.425c-45.587 26.148-103.732 10.665-130.052-34.75h.172zm204.54 87.39c-22.192 0-43.867-7.741-60.898-22.02a62.439 62.439 0 003.097-1.72l101.152-58.317c5.16-2.924 8.429-8.43 8.257-14.45V243.527l43.523 25.116v113.022c0 52.64-42.663 95.303-95.131 95.303v-.172zM461.22 343.303c-11.182 19.267-28.729 34.061-49.544 41.63V264.687c0-6.021-3.097-11.526-8.257-14.45L284.893 181.77l43.523-25.116 97.883 56.424c45.587 26.32 61.07 84.466 34.75 130.053l.172.172z" fill="#10A37F" fillRule="nonzero"/>
      </svg>;
    } else if (modelName.includes('mistral')) {
      return <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }} fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
        <g transform="translate(6 79.299) scale(1.96335)">
          <clipPath id="prefix__a">
            <path d="M0 0h254.667v180H0z"/>
          </clipPath>
          <g clipPath="url(#prefix__a)">
            <g transform="scale(1.33333)">
              <clipPath id="prefix__b">
                <path d="M0 0h190.141v135H0z"/>
              </clipPath>
              <g clipPath="url(#prefix__b)" fillRule="nonzero">
                <path fill="#ffd800" d="M27.153 0h27.169v27.089H27.153zM135.815 0h27.169v27.089h-27.169z"/>
                <path fill="#ffaf00" d="M27.153 27.091h54.329V54.18H27.153zM108.661 27.091h54.329V54.18h-54.329z"/>
                <path fill="#ff8205" d="M27.153 54.168h135.819v27.089H27.153z"/>
                <path fill="#fa500f" d="M27.153 81.259h27.169v27.09H27.153zM81.492 81.259h27.169v27.09H81.492zM135.815 81.259h27.169v27.09h-27.169z"/>
                <path fill="#e10500" d="M-.001 108.339h81.489v27.09H-.001zM108.661 108.339h81.498v27.09h-81.498z"/>
              </g>
            </g>
          </g>
        </g>
      </svg>;
    }
    return null;
  };

  const getModelIcon = (modelName: string) => {
    const name = modelName.toLowerCase();
    
    if (name.includes('gemini')) {
      return <svg 
        width="24" 
        height="24" 
        viewBox="0 0 65 65" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <mask id="maskme" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="65" height="65">
          <path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="#000"/>
          <path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="url(#prefix__paint0_linear_2001_67)"/>
        </mask>
        <g mask="url(#maskme)">
          <g filter="url(#prefix__filter0_f_2001_67)">
            <path d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z" fill="#FFE432"/>
          </g>
          <g filter="url(#prefix__filter1_f_2001_67)">
            <path d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z" fill="#FC413D"/>
          </g>
          <g filter="url(#prefix__filter2_f_2001_67)">
            <path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"/>
          </g>
          <g filter="url(#prefix__filter3_f_2001_67)">
            <path d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z" fill="#00B95C"/>
          </g>
          <g filter="url(#prefix__filter4_f_2001_67)">
            <path d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z" fill="#00B95C"/>
          </g>
          <g filter="url(#prefix__filter5_f_2001_67)">
            <path d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z" fill="#3186FF"/>
          </g>
          <g filter="url(#prefix__filter6_f_2001_67)">
            <path d="M-13.065 40.944c9.33 7.094 22.959 4.869 30.442-4.972 7.483-9.84 5.987-23.569-3.343-30.663C4.704-1.786-8.924.439-16.408 10.28c-7.483 9.84-5.986 23.57 3.343 30.664z" fill="#FBBC04"/>
          </g>
          <g filter="url(#prefix__filter7_f_2001_67)">
            <path d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z" fill="#3186FF"/>
          </g>
          <g filter="url(#prefix__filter8_f_2001_67)">
            <path d="M54.984-2.336c2.833 3.852-.808 11.34-8.131 16.727-7.324 5.387-15.557 6.631-18.39 2.78-2.833-3.853.807-11.342 8.13-16.728 7.324-5.387 15.558-6.631 18.39-2.78z" fill="#749BFF"/>
          </g>
          <g filter="url(#prefix__filter9_f_2001_67)">
            <path d="M31.727 16.104C43.053 5.598 46.94-8.626 40.41-15.666c-6.53-7.04-21.006-4.232-32.332 6.274s-15.214 24.73-8.683 31.77c6.53 7.04 21.006 4.232 32.332-6.274z" fill="#FC413D"/>
          </g>
          <g filter="url(#prefix__filter10_f_2001_67)">
            <path d="M8.51 53.838c6.732 4.818 14.46 5.55 17.262 1.636 2.802-3.915-.384-10.994-7.116-15.812-6.731-4.818-14.46-5.55-17.261-1.636-2.802 3.915.383 10.994 7.115 15.812z" fill="#FFEE48"/>
          </g>
        </g>
        <defs>
          <filter id="prefix__filter0_f_2001_67" x="-19.824" y="13.152" width="39.274" height="43.217" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="2.46" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter1_f_2001_67" x="-15.001" y="-40.257" width="84.868" height="85.688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="11.891" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter2_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter3_f_2001_67" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter4_f_2001_67" x="-19.845" y="15.459" width="79.731" height="81.505" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter5_f_2001_67" x="29.832" y="-11.552" width="75.117" height="73.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="9.606" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter6_f_2001_67" x="-38.583" y="-16.253" width="78.135" height="78.758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="8.706" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter7_f_2001_67" x="8.107" y="-5.966" width="78.877" height="77.539" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="7.775" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter8_f_2001_67" x="13.587" y="-18.488" width="56.272" height="51.81" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="6.957" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter9_f_2001_67" x="-15.526" y="-31.297" width="70.856" height="69.306" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="5.876" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <filter id="prefix__filter10_f_2001_67" x="-14.168" y="20.964" width="55.501" height="51.571" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="7.273" result="effect1_foregroundBlur_2001_67"/>
          </filter>
          <linearGradient id="prefix__paint0_linear_2001_67" x1="18.447" y1="43.42" x2="52.153" y2="15.004" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4893FC"/>
            <stop offset=".27" stopColor="#4893FC"/>
            <stop offset=".777" stopColor="#969DFF"/>
            <stop offset="1" stopColor="#BD99FE"/>
          </linearGradient>
        </defs>
      </svg>;
    } else if (name.includes('qwen')) {
      return <svg 
        width="24" 
        height="24" 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path d="M268.885 28.587a9886.443 9886.443 0 0125.046 44.266 3.833 3.833 0 003.349 1.942h118.443c3.712 0 6.869 2.346 9.514 6.976l31.019 54.826c4.053 7.19 5.12 10.198.512 17.856a1129.453 1129.453 0 00-16.213 27.734l-7.83 14.037c-2.261 4.181-4.757 5.973-.853 10.923l56.576 98.922c3.669 6.422 2.368 10.539-.917 16.427a2813.646 2813.646 0 01-28.48 49.92c-3.392 5.803-7.51 8-14.507 7.893a916.763 916.763 0 00-49.643.342 2.12 2.12 0 00-1.728 1.066 12257.343 12257.343 0 01-57.706 101.12c-3.606 6.251-8.107 7.744-15.467 7.766-21.269.064-42.709.085-64.363.042a11.45 11.45 0 01-9.92-5.781l-28.48-49.557a1.919 1.919 0 00-1.77-1.046H106.283c-6.08.64-11.798-.021-17.174-1.962l-34.197-59.094a11.58 11.58 0 01-.043-11.52l25.75-45.226a4.225 4.225 0 000-4.203 11754.482 11754.482 0 01-40-69.803l-16.854-29.76c-3.413-6.613-3.69-10.581 2.027-20.586 9.92-17.344 19.776-34.667 29.59-51.968 2.815-4.992 6.485-7.126 12.458-7.147 18.41-.078 36.821-.085 55.232-.021a2.651 2.651 0 002.283-1.344L185.216 27.2a10.412 10.412 0 019.003-5.248c11.178-.021 22.464 0 33.77-.128l21.696-.49c7.275-.065 15.446.682 19.2 7.253zm-73.216 8.597a1.281 1.281 0 00-1.109.64l-61.141 106.987a3.347 3.347 0 01-2.88 1.664H69.397c-1.194 0-1.493.533-.874 1.578l123.946 216.662c.534.896.278 1.322-.725 1.344l-59.627.32a4.647 4.647 0 00-4.266 2.474l-28.16 49.28c-.939 1.664-.448 2.518 1.45 2.518l121.942.17c.981 0 1.706.427 2.218 1.302l29.931 52.352c.981 1.728 1.963 1.749 2.965 0l106.795-186.88 16.704-29.483a1.169 1.169 0 011.024-.601 1.17 1.17 0 011.024.601l30.379 53.973a2.599 2.599 0 002.282 1.323l58.944-.427a.846.846 0 00.858-.853.877.877 0 00-.111-.427L414.229 203.2a2.31 2.31 0 010-2.411l6.251-10.816 23.893-42.176c.512-.874.256-1.322-.746-1.322h-247.36c-1.259 0-1.558-.555-.918-1.643l30.592-53.44a2.276 2.276 0 000-2.432L196.8 37.845a1.276 1.276 0 00-1.131-.661zm134.187 171.093c.981 0 1.237.427.725 1.28l-17.749 31.254-55.744 97.813a1.199 1.199 0 01-1.067.619 1.242 1.242 0 01-1.066-.619l-73.664-128.683c-.427-.725-.214-1.109.597-1.152l4.608-.256 143.403-.256h-.043z" fill="url(#prefix__paint0_linear_9_19)"/>
        <defs>
          <linearGradient id="prefix__paint0_linear_9_19" x1="21.323" y1="21.33" x2="46955.3" y2="21.33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6336E7" stopOpacity=".84"/>
            <stop offset="1" stopColor="#6F69F7" stopOpacity=".84"/>
          </linearGradient>
        </defs>
      </svg>;
    } else if (name.includes('deepseek')) {
      return <svg 
        width="24" 
        height="24" 
        viewBox="120 0 280 509.64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path fill="#4D6BFE" fillRule="nonzero" d="M440.898 139.167c-4.001-1.961-5.723 1.776-8.062 3.673-.801.612-1.479 1.407-2.154 2.141-5.848 6.246-12.681 10.349-21.607 9.859-13.048-.734-24.192 3.368-34.04 13.348-2.093-12.307-9.048-19.658-19.635-24.37-5.54-2.449-11.141-4.9-15.02-10.227-2.708-3.795-3.447-8.021-4.801-12.185-.861-2.509-1.725-5.082-4.618-5.512-3.139-.49-4.372 2.142-5.601 4.349-4.925 9.002-6.833 18.921-6.647 28.962.432 22.597 9.972 40.597 28.932 53.397 2.154 1.47 2.707 2.939 2.032 5.082-1.293 4.41-2.832 8.695-4.186 13.105-.862 2.817-2.157 3.429-5.172 2.205-10.402-4.346-19.391-10.778-27.332-18.553-13.481-13.044-25.668-27.434-40.873-38.702a177.614 177.614 0 00-10.834-7.409c-15.512-15.063 2.032-27.434 6.094-28.902 4.247-1.532 1.478-6.797-12.251-6.736-13.727.061-26.285 4.653-42.288 10.777-2.34.92-4.801 1.593-7.326 2.142-14.527-2.756-29.608-3.368-45.367-1.593-29.671 3.305-53.368 17.329-70.788 41.272-20.928 28.785-25.854 61.482-19.821 95.59 6.34 35.943 24.683 65.704 52.876 88.974 29.239 24.123 62.911 35.943 101.32 33.677 23.329-1.346 49.307-4.468 78.607-29.27 7.387 3.673 15.142 5.144 28.008 6.246 9.911.92 19.452-.49 26.839-2.019 11.573-2.449 10.773-13.166 6.586-15.124-33.915-15.797-26.47-9.368-33.24-14.573 17.235-20.39 43.213-41.577 53.369-110.222.8-5.448.121-8.877 0-13.287-.061-2.692.553-3.734 3.632-4.041 8.494-.981 16.742-3.305 24.314-7.471 21.975-12.002 30.84-31.719 32.933-55.355.307-3.612-.061-7.348-3.879-9.245v-.003zM249.4 351.89c-32.872-25.838-48.814-34.352-55.4-33.984-6.155.368-5.048 7.41-3.694 12.002 1.415 4.532 3.264 7.654 5.848 11.634 1.785 2.634 3.017 6.551-1.784 9.493-10.587 6.55-28.993-2.205-29.856-2.635-21.421-12.614-39.334-29.269-51.954-52.047-12.187-21.924-19.267-45.435-20.435-70.542-.308-6.061 1.478-8.207 7.509-9.307 7.94-1.471 16.127-1.778 24.068-.615 33.547 4.9 62.108 19.902 86.054 43.66 13.666 13.531 24.007 29.699 34.658 45.496 11.326 16.778 23.514 32.761 39.026 45.865 5.479 4.592 9.848 8.083 14.035 10.656-12.62 1.407-33.673 1.714-48.075-9.676zm15.899-102.519c.521-2.111 2.421-3.658 4.722-3.658a4.74 4.74 0 011.661.305c.678.246 1.293.614 1.786 1.163.861.859 1.354 2.083 1.354 3.368 0 2.695-2.154 4.837-4.862 4.837a4.748 4.748 0 01-4.738-4.034 5.01 5.01 0 01.077-1.981zm47.208 26.915c-2.606.996-5.2 1.778-7.707 1.88-4.679.244-9.787-1.654-12.556-3.981-4.308-3.612-7.386-5.631-8.679-11.941-.554-2.695-.247-6.858.246-9.246 1.108-5.144-.124-8.451-3.754-11.451-2.954-2.449-6.711-3.122-10.834-3.122-1.539 0-2.954-.673-4.001-1.224-1.724-.856-3.139-3-1.785-5.634.432-.856 2.525-2.939 3.018-3.305 5.6-3.185 12.065-2.144 18.034.244 5.54 2.266 9.727 6.429 15.759 12.307 6.155 7.102 7.263 9.063 10.773 14.39 2.771 4.163 5.294 8.451 7.018 13.348.877 2.561.071 4.74-2.341 6.277-.981.625-2.109 1.044-3.191 1.458z"/>
      </svg>;
    } else if (name.includes('grok')) {
      return <svg 
        width="24" 
        height="24" 
        viewBox="0 0 512 492" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M197.76 315.52l170.197-125.803c8.342-6.186 20.267-3.776 24.256 5.803 20.907 50.539 11.563 111.253-30.08 152.939-41.621 41.685-99.562 50.816-152.512 29.994l-57.834 26.816c82.965 56.768 183.701 42.731 246.656-20.33 49.941-50.006 65.408-118.166 50.944-179.627l.128.149c-20.971-90.282 5.162-126.378 58.666-200.17 1.28-1.75 2.56-3.499 3.819-5.291l-70.421 70.507v-.214l-243.883 245.27m-35.072 30.528c-59.563-56.96-49.28-145.088 1.515-195.926 37.568-37.61 99.136-52.97 152.874-30.4l57.707-26.666a166.554 166.554 0 00-39.019-21.334 191.467 191.467 0 00-208.042 41.942c-54.038 54.101-71.04 137.301-41.856 208.298 21.802 53.056-13.931 90.582-49.92 128.47C23.104 463.915 10.304 477.333 0 491.541l162.56-145.386" fill="#000"/>
      </svg>;
    } else if (name.includes('gpt') || name.includes('openai')) {
      return <svg 
        width="24" 
        height="24" 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <path d="M474.123 209.81c11.525-34.577 7.569-72.423-10.838-103.904-27.696-48.168-83.433-72.94-137.794-61.414a127.14 127.14 0 00-95.475-42.49c-55.564 0-104.936 35.781-122.139 88.593-35.781 7.397-66.574 29.76-84.637 61.414-27.868 48.167-21.503 108.72 15.826 150.007-11.525 34.578-7.569 72.424 10.838 103.733 27.696 48.34 83.433 73.111 137.966 61.585 24.084 27.18 58.833 42.835 95.303 42.663 55.564 0 104.936-35.782 122.139-88.594 35.782-7.397 66.574-29.76 84.465-61.413 28.04-48.168 21.676-108.722-15.654-150.008v-.172zm-39.567-87.218c11.01 19.267 15.139 41.803 11.354 63.65-.688-.516-2.064-1.204-2.924-1.72l-101.152-58.49a16.965 16.965 0 00-16.687 0L206.621 194.5v-50.232l97.883-56.597c45.587-26.32 103.732-10.666 130.052 34.921zm-227.935 104.42l49.888-28.9 49.887 28.9v57.63l-49.887 28.9-49.888-28.9v-57.63zm23.223-191.81c22.364 0 43.867 7.742 61.07 22.02-.688.344-2.064 1.204-3.097 1.72L186.666 117.26c-5.161 2.925-8.258 8.43-8.258 14.45v136.934l-43.523-25.116V130.333c0-52.64 42.491-95.13 95.131-95.302l-.172.172zM52.14 168.697c11.182-19.268 28.557-34.062 49.544-41.803V247.14c0 6.02 3.097 11.354 8.258 14.45l118.354 68.295-43.695 25.288-97.711-56.425c-45.415-26.32-61.07-84.465-34.75-130.052zm26.665 220.71c-11.182-19.095-15.139-41.802-11.354-63.65.688.516 2.064 1.204 2.924 1.72l101.152 58.49a16.965 16.965 0 0016.687 0l118.354-68.467v50.232l-97.883 56.425c-45.587 26.148-103.732 10.665-130.052-34.75h.172zm204.54 87.39c-22.192 0-43.867-7.741-60.898-22.02a62.439 62.439 0 003.097-1.72l101.152-58.317c5.16-2.924 8.429-8.43 8.257-14.45V243.527l43.523 25.116v113.022c0 52.64-42.663 95.303-95.131 95.303v-.172zM461.22 343.303c-11.182 19.267-28.729 34.061-49.544 41.63V264.687c0-6.021-3.097-11.526-8.257-14.45L284.893 181.77l43.523-25.116 97.883 56.424c45.587 26.32 61.07 84.466 34.75 130.053l.172.172z" fill="#10A37F" fillRule="nonzero"/>
      </svg>;
    } else if (name.includes('mistral')) {
      return <svg 
        width="24" 
        height="24" 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
      >
        <g transform="translate(6 79.299) scale(1.96335)">
          <clipPath id="prefix__a">
            <path d="M0 0h254.667v180H0z"/>
          </clipPath>
          <g clipPath="url(#prefix__a)">
            <g transform="scale(1.33333)">
              <clipPath id="prefix__b">
                <path d="M0 0h190.141v135H0z"/>
              </clipPath>
              <g clipPath="url(#prefix__b)" fillRule="nonzero">
                <path fill="#ffd800" d="M27.153 0h27.169v27.089H27.153zM135.815 0h27.169v27.089h-27.169z"/>
                <path fill="#ffaf00" d="M27.153 27.091h54.329V54.18H27.153zM108.661 27.091h54.329V54.18h-54.329z"/>
                <path fill="#ff8205" d="M27.153 54.168h135.819v27.089H27.153z"/>
                <path fill="#fa500f" d="M27.153 81.259h27.169v27.09H27.153zM81.492 81.259h27.169v27.09H81.492zM135.815 81.259h27.169v27.09h-27.169z"/>
                <path fill="#e10500" d="M-.001 108.339h81.489v27.09H-.001zM108.661 108.339h81.498v27.09h-81.498z"/>
              </g>
            </g>
          </g>
        </g>
      </svg>;
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
      >
        Попробовать модель: {modelId}
      </Snackbar>
    );
  };

  // Функция для форматирования цены в рублях за миллион токенов
  const formatPriceInRubles = (promptPrice: number, completionPrice: number): string => {
    if (promptPrice === 0 && completionPrice === 0) {
      return "Бесплатно";
    }
    
    // Просто умножаем на миллион
    const promptPricePerMillion = promptPrice * 1000000;
    const completionPricePerMillion = completionPrice * 1000000;
    
    return `${promptPricePerMillion.toFixed(2)}₽ / ${completionPricePerMillion.toFixed(2)}₽`;
  };

  // Функция для форматирования размера контекста
  const formatContextLength = (contextLength: number): string => {
    if (contextLength >= 1000000) {
      return `${(contextLength / 1000000).toFixed(1)}M`;
    } else if (contextLength >= 1000) {
      return `${(contextLength / 1000).toFixed(0)}K`;
    } else {
      return `${contextLength}`;
    }
  };

  // Функция для форматирования поддерживаемых модальностей
  const formatModalities = (modalities: string[]): string => {
    const modalityMap: { [key: string]: string } = {
      'text': 'Текст',
      'image': 'Изображения',
      'file': 'Файлы',
      'audio': 'Аудио'
    };
    
    return modalities.map(mod => modalityMap[mod] || mod).join(', ');
  };

  useEffect(() => {
    if (responseData.success && responseData.data.models) {
      const processedModels: ProcessedModel[] = responseData.data.models
        .slice(0, 50) // Show first 50 models
        .map((model: ModelData) => {
          // Extract provider from name (e.g., "Google: Gemini 2.5" -> "Google")
          const provider = model.name.split(':')[0] || 'Unknown';

          // Format pricing in rubles per million tokens
          const promptPrice = model.pricing.prompt;
          const completionPrice = model.pricing.completion;
          const priceText = formatPriceInRubles(promptPrice, completionPrice);

          // Determine if popular (based on well-known models)
          const isPopular = model.name.toLowerCase().includes('gpt-4') || 
                           model.name.toLowerCase().includes('gpt-5') ||
                           model.name.toLowerCase().includes('claude') ||
                           model.name.toLowerCase().includes('gemini-2.5');

          return {
            id: model.id,
            name: model.name,
            provider,
            description: model.description.length > 100 
              ? model.description.substring(0, 100) + '...' 
              : model.description,
            price: priceText,
            contextLength: model.context_length,
            inputModalities: model.architecture.input_modalities,
            isPopular,
          };
        });

          setModels(processedModels);
          setFilteredModels(processedModels);
    }
  }, []);

  return (
    <Panel id={id}>
      <style>
        {`
          /* Убираем полосу прокрутки */
          body, html {
            overflow-x: hidden !important;
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
            <IconButton
              onClick={handleSortToggle}
            >
               {sortOrder === 'asc' ? <Icon16ArrowTriangleUp /> : <Icon16ArrowTriangleDown />}
            </IconButton>
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
              {getModelIconSmall('gpt')}
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
              {getModelIconSmall('deepseek')}
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
              {getModelIconSmall('grok')}
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
              {getModelIconSmall('gemini')}
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
              {getModelIconSmall('mistral')}
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
              {getModelIconSmall('qwen')}
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
              {getModelIcon(model.name)}
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
      {snackbar}
    </Panel>
  );
};
