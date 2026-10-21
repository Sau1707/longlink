import * as icons from '@/lib/icons';
import type { ReactNode } from 'react';
import { PageLoading } from '@/components/Utils';
import { Link as RouterLink } from 'react-router';
import { ApiBoundary } from '@/components/ApiBoundary';
import { ApiProvider } from '@/components/ApiProvider';
import { appearanceBootstrap } from '@/lib/appearance';
import { LinkProvider } from '@astryxdesign/core/Link';
import { LayerProvider } from '@astryxdesign/core/Layer';
import { IconRequestContext } from '@/components/ui/Icon';
import { AppearanceProvider, AppearanceSync } from '@/components/Appearance';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import '@/index.css';
// Handwritten fonts belong only to native Platform pages, not the embedded SDK application.
import '@fontsource/kalam';
import '@fontsource/kalam/700.css';

/** Shows the themed loading state while the initial route modules load. */
export function HydrateFallback() {
    // The document's startup theme styles the fallback before providers mount.
    return <PageLoading label="Loading" />;
}

/** Provides the Platform runtime and native fonts. */
export default function PlatformRoot() {
    // Keep theme, link, layer, and API ownership around the active route.
    return (
        <AppearanceProvider>
            <LinkProvider component={RouterLink}>
                <LayerProvider toast={{ position: 'bottomEnd' }}>
                    <IconRequestContext value={icons.load}>
                        <ApiProvider>
                            <AppearanceSync />
                            <ApiBoundary>
                                <Outlet />
                            </ApiBoundary>
                        </ApiProvider>
                    </IconRequestContext>
                </LayerProvider>
            </LinkProvider>
        </AppearanceProvider>
    );
}

/** Adds website analytics only to production Platform documents. */
export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" data-astryx-theme="stone" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script dangerouslySetInnerHTML={{ __html: appearanceBootstrap }} />
                <Meta />
                <Links />
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" sizes="any" />
                {import.meta.env.PROD && (
                    <script
                        defer
                        src="https://cloud.umami.is/script.js"
                        data-website-id="eff115b8-10d7-4507-abf5-6b3de55eab3f"
                    />
                )}
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
