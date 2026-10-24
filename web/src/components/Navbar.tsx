import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Link } from '@astryxdesign/core/Link';
import { Wordmark } from '@/components/Wordmark';
import { Stack } from '@astryxdesign/core/Stack';
import { Button } from '@astryxdesign/core/Button';
import { TopNav } from '@astryxdesign/core/TopNav';

/** Renders public navigation at the page's content width. */
export function Navbar({
    maxWidth = 1000,
    navigation,
    expandOnTop = false,
}: {
    maxWidth?: number;
    navigation?: ReactNode;
    expandOnTop?: boolean;
}) {
    const [scrolled, setScrolled] = useState(false);

    // Expand the landing navigation only while the page is at the top.
    useEffect(() => {
        if (!expandOnTop) return;

        const onScroll = () => setScrolled(window.scrollY > 0);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, [expandOnTop]);

    return (
        <Stack
            as="header"
            className={
                expandOnTop
                    ? `sticky top-0 z-30 border-b ${scrolled ? 'border-border bg-body/50 backdrop-blur-sm' : 'border-transparent bg-transparent'}`
                    : 'border-b border-border bg-body'
            }
            paddingInline={6}
        >
            <Stack
                className="mx-auto transition-[max-width] duration-300 ease-out motion-reduce:transition-none"
                maxWidth={expandOnTop && !scrolled ? '100%' : maxWidth}
                width="100%"
            >
                <TopNav
                    className="py-3"
                    heading={
                        <Link href="/" label="LongLink home" color="inherit">
                            <Wordmark size="heading" />
                        </Link>
                    }
                    label="Main navigation"
                    endContent={
                        <Stack direction="horizontal" gap={6} vAlign="center">
                            <Link href="/blog/" color="secondary" isStandalone weight="medium">
                                Blog
                            </Link>
                            <Link className="sm:hidden" href="/docs/" color="secondary" isStandalone weight="medium">
                                Docs
                            </Link>
                            <Stack className="hidden sm:flex" direction="horizontal" gap={4} vAlign="center">
                                <Link href="/docs/" color="secondary" isStandalone weight="medium">
                                    Documentation
                                </Link>
                                <Link href="/pricing/" color="secondary" isStandalone weight="medium">
                                    Pricing
                                </Link>
                                <Link
                                    as="a"
                                    color="secondary"
                                    href="https://github.com/xLongLink/longlink"
                                    isExternalLink
                                    isStandalone
                                    weight="medium"
                                >
                                    GitHub
                                </Link>
                            </Stack>
                            <Button href="/login/" label="Sign In" size="sm" variant="primary" />
                        </Stack>
                    }
                />
                {navigation}
            </Stack>
        </Stack>
    );
}
