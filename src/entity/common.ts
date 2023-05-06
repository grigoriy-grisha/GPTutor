import { v4 } from "uuid";

//todo Заменить на встроенный crypto api
export type UUID_V4 = ReturnType<typeof v4>;
