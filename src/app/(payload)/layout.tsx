import configPromise from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type React from "react";
import { importMap } from "./admin/importMap";
import "@payloadcms/next/css";

const serverFunction = async (args: {
  name: string;
  args: Record<string, unknown>;
}) => {
  "use server";
  return handleServerFunctions({ ...args, config: configPromise, importMap });
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout
          config={configPromise}
          importMap={importMap}
          serverFunction={serverFunction}
        >
          {children}
        </RootLayout>
      </body>
    </html>
  );
}
