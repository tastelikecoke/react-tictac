import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("page1", "routes/page1.tsx"),
    route("page2", "routes/page2.tsx")
] satisfies RouteConfig;
