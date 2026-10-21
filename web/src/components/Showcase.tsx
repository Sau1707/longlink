import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Icon } from '@astryxdesign/core/Icon';
import { Item } from '@astryxdesign/core/Item';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { Avatar } from '@/components/ui/Avatar';
import { Wordmark } from '@/components/Wordmark';
import { Badge } from '@astryxdesign/core/Badge';
import { Stack } from '@astryxdesign/core/Stack';
import { Button } from '@astryxdesign/core/Button';
import { Divider } from '@astryxdesign/core/Divider';
import { Heading } from '@astryxdesign/core/Heading';
import { Popover } from '@astryxdesign/core/Popover';
import { Section } from '@astryxdesign/core/Section';
import { List, ListItem } from '@astryxdesign/core/List';
import { Thumbnail } from '@astryxdesign/core/Thumbnail';
import { Tab, TabList } from '@astryxdesign/core/TabList';
import { PageContainer } from '@/components/PageContainer';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Step, Stepper } from '@astryxdesign/core/Stepper';
import { PlatformFrame } from '@/components/layouts/Platform';
import { Table, proportional } from '@astryxdesign/core/Table';
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput';
import { BreadcrumbItem, Breadcrumbs } from '@astryxdesign/core/Breadcrumbs';
import { Layout, LayoutContent, LayoutPanel } from '@astryxdesign/core/Layout';
import {
    Circle,
    Building2,
    Folder,
    Trophy,
    ChartNoAxesCombined,
    ChevronRight,
    BookOpen,
    ExternalLink,
    ListChecks,
} from 'lucide-react';

// Browse local organizations and their Solutions without requesting account data.
const organizations = [
    {
        id: 'architecture',
        name: 'Architecture',
        description: 'Example architecture firm',
        tabs: ['Projects', 'Competitions'],
    },
    {
        id: 'real-estate',
        name: 'Real Estate',
        description: 'Example real estate firm',
        tabs: ['Residential', 'Commercial'],
    },
    {
        id: 'finance',
        name: 'Finance',
        description: 'Example finance firm',
        tabs: ['Fixed Income', 'Equities', 'ETFs'],
    },
] as const;

// Keep the architectural firm's existing example projects.
const projects = [
    {
        id: 1,
        name: '001 - Riverside Residences',
        description: 'Modern riverside apartments.',
        status: 'Planning',
        owner: 'Anna Keller',
        ownerEmail: 'anna.keller@example.com',
        photo: 'riverside',
    },
    {
        id: 2,
        name: '002 - Skyline Tower',
        description: 'A new landmark for the city.',
        status: 'In progress',
        owner: 'Marco Rossi',
        ownerEmail: 'marco.rossi@example.com',
        photo: 'skyline',
    },
    {
        id: 3,
        name: '003 - Garden Apartments',
        description: 'Light-filled homes with green spaces.',
        status: 'Completed',
        owner: 'Anna Keller',
        ownerEmail: 'anna.keller@example.com',
        photo: 'garden',
    },
    {
        id: 4,
        name: '004 - Harbor Offices',
        description: 'Contemporary waterfront workspaces.',
        status: 'In progress',
        owner: 'Marco Rossi',
        ownerEmail: 'marco.rossi@example.com',
        photo: 'harbor',
    },
];

// Present competition entries as separate Solutions alongside commissioned projects.
const competitions = [
    {
        id: 5,
        name: '005 - Riverfront Cultural Center',
        description: 'An open competition for a new public arts venue.',
        status: 'In progress',
        owner: 'Anna Keller',
        ownerEmail: 'anna.keller@example.com',
        photo: 'riverside',
    },
    {
        id: 6,
        name: '006 - Urban Living Pavilion',
        description: 'A concept for sustainable city living.',
        status: 'Planning',
        owner: 'Marco Rossi',
        ownerEmail: 'marco.rossi@example.com',
        photo: 'garden',
    },
];

// Give the real estate organization its own listings and sales progress.
const properties = [
    {
        id: 1,
        name: 'Riverside Apartment',
        category: 'Residential',
        description: '3 bedrooms · 145 m² · $890,000',
        status: 'Listed',
        owner: 'Sofia Meyer',
        ownerEmail: 'sofia.meyer@example.com',
        photo: 'riverside',
    },
    {
        id: 2,
        name: 'Skyline Penthouse',
        category: 'Residential',
        description: '4 bedrooms · 220 m² · $1,650,000',
        status: 'Under offer',
        owner: 'James Wilson',
        ownerEmail: 'james.wilson@example.com',
        photo: 'skyline',
    },
    {
        id: 3,
        name: 'Garden Residence',
        category: 'Residential',
        description: '2 bedrooms · 98 m² · $620,000',
        status: 'Sold',
        owner: 'Sofia Meyer',
        ownerEmail: 'sofia.meyer@example.com',
        photo: 'garden',
    },
    {
        id: 4,
        name: 'Harbor Office Suite',
        category: 'Commercial',
        description: 'Office · 310 m² · $1,240,000',
        status: 'Listed',
        owner: 'James Wilson',
        ownerEmail: 'james.wilson@example.com',
        photo: 'harbor',
    },
];

// Keep sample stock prices explicit and independent of live market services.
const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 225.5, change: 1.24, shares: 120 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 418.75, change: 0.86, shares: 80 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 132.4, change: -1.35, shares: 200 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 176.3, change: 0.52, shares: 100 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 198.6, change: -0.42, shares: 90 },
    { symbol: 'V', name: 'Visa Inc.', price: 285.9, change: 0.68, shares: 60 },
];

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// Give the finance organization a separate example fund portfolio.
const funds = [
    { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', price: 285.4, change: 0.45, shares: 150 },
    { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: 525.8, change: 0.62, shares: 100 },
    { symbol: 'VXUS', name: 'Vanguard Total International Stock ETF', price: 63.2, change: -0.28, shares: 200 },
];

// List example corporate issuers separately from equity and fund holdings.
const companies = [
    { name: 'Apple Inc.', industry: 'Technology', country: 'United States' },
    { name: 'Microsoft Corporation', industry: 'Technology', country: 'United States' },
    { name: 'Amazon.com Inc.', industry: 'Consumer discretionary', country: 'United States' },
    { name: 'Visa Inc.', industry: 'Financial services', country: 'United States' },
    { name: 'Siemens AG', industry: 'Industrials', country: 'Germany' },
    { name: 'Nestlé S.A.', industry: 'Consumer staples', country: 'Switzerland' },
];

// Follow the supplied SIA phases, sub-phases, and required document lists.
const projectSteps = [
    {
        label: 'Strategic Planning',
        description: 'Define what you want to build, the budget, and your objectives.',
        subphases: [
            {
                code: '11',
                label: 'Definition of Needs and Strategies',
                documents: [
                    'Client requirements brief (cahier des charges)',
                    'Project objectives and scope',
                    'Initial budget and financing assumptions',
                    'Preliminary project schedule',
                    'Site/property information',
                    'Strategic options and decision report',
                ],
            },
        ],
    },
    {
        label: 'Preliminary Studies',
        description: 'Check the feasibility and select the project team.',
        subphases: [
            {
                code: '21',
                label: 'Project Definition and Feasibility',
                documents: [
                    'Project brief / programme',
                    'Cadastral and site survey',
                    'Land registry and zoning information',
                    'Existing building drawings, if applicable',
                    'Feasibility study',
                    'Initial sketches and massing studies',
                    'Preliminary cost and schedule estimates',
                    'Geotechnical or environmental studies, where necessary',
                ],
            },
            {
                code: '22',
                label: 'Selection Procedure',
                documents: [
                    'Architect/consultant selection brief',
                    'Competition or tender programme, if applicable',
                    'Selection and evaluation criteria',
                    'Tender/competition submissions',
                    'Evaluation report',
                    'Appointment decision',
                    'Architect and consultant agreements',
                ],
            },
        ],
    },
    {
        label: 'Project Design',
        description: 'Design the house and obtain planning permission.',
        subphases: [
            {
                code: '31',
                label: 'Preliminary Design (Avant-projet)',
                documents: [
                    'Preliminary architectural plans, sections and elevations',
                    'Concept sketches and site layout',
                    'Preliminary structural and MEP concepts',
                    'Area and volume calculations',
                    'Initial material and construction concept',
                    'Preliminary cost estimate',
                    'General project schedule',
                    'Preliminary design report',
                ],
            },
            {
                code: '32',
                label: "Developed Design (Projet de l'ouvrage)",
                documents: [
                    'Developed architectural plans, sections and elevations',
                    'Coordinated structural and MEP drawings',
                    'Construction and material specifications',
                    'Preliminary construction details',
                    'Energy and building physics concepts',
                    'Fire safety concept, if required',
                    'Detailed cost estimate (devis général)',
                    'Updated project schedule',
                    'Design coordination documentation',
                ],
            },
            {
                code: '33',
                label: 'Building Permit Procedure',
                documents: [
                    'Building permit application forms',
                    'Official site/cadastral plans',
                    'Permit drawings (plans, sections, elevations)',
                    'Area, volume and regulatory calculations',
                    'Energy compliance documentation',
                    'Fire safety and acoustic documentation, as applicable',
                    'Technical and environmental reports, if required',
                    'Other cantonal/municipal authorizations',
                    'Building permit decision and approved drawings',
                ],
            },
        ],
    },
    {
        label: 'Tendering',
        description: 'Request quotations, compare contractors, and award contracts.',
        subphases: [
            {
                code: '41',
                label: 'Tendering, Bid Comparison and Contract Award',
                documents: [
                    'Tender drawings and technical specifications',
                    'Bills of quantities / descriptions of works (CFC or CAN/NPK, as applicable)',
                    'Tender conditions and pricing forms',
                    "Contractors' quotations",
                    'Bid comparison tables',
                    'Tender evaluation and award recommendation',
                    'Updated cost forecast',
                    'Contract award documentation',
                ],
            },
        ],
    },
    {
        label: 'Construction / Realization',
        description: 'Prepare construction drawings, build, inspect, and hand over the house.',
        subphases: [
            {
                code: '51',
                label: 'Execution Design',
                documents: [
                    'Detailed architectural execution drawings',
                    'Structural execution drawings',
                    'Coordinated MEP installation drawings',
                    'Construction details and technical specifications',
                    'Material and finish schedules',
                    'Contractor shop drawings, where applicable',
                    'Approved samples',
                    'Construction contracts',
                    'Definitive construction programme',
                    'Payment schedule',
                ],
            },
            {
                code: '52',
                label: 'Construction Execution',
                documents: [
                    'Approved construction drawings',
                    'Building permit and applicable conditions',
                    'Site meeting minutes',
                    'Construction diary and progress reports',
                    'Inspection and quality-control records',
                    'Material approval records',
                    'Variation orders and revised drawings',
                    'Contractor invoices and payment certificates',
                    'Updated cost reports',
                    'Updated construction schedule',
                    'Measurement records',
                ],
            },
            {
                code: '53',
                label: 'Commissioning and Completion',
                documents: [
                    'As-built / record drawings',
                    'Commissioning and testing reports',
                    'Inspection and acceptance certificates',
                    'Handover protocols (procès-verbaux de réception)',
                    'Defects / snagging lists',
                    'Operation and maintenance manuals',
                    'Equipment documentation',
                    'Warranties and guarantees',
                    'Final cost statement (décompte final)',
                    'Complete building handover dossier',
                ],
            },
        ],
    },
];

// Follow the property sales lifecycle independently from architectural construction phases.
const propertySteps = [
    {
        label: 'Valuation',
        description: 'Assess the property and agree on an asking price.',
        documents: [
            { name: 'Property valuation', available: true },
            { name: 'Agency agreement', available: true },
        ],
    },
    {
        label: 'Listing',
        description: 'Publish the listing with photos and property details.',
        documents: [
            { name: 'Listing brochure', available: true },
            { name: 'Floor plans', available: true },
        ],
    },
    {
        label: 'Viewings',
        description: 'Arrange visits and collect buyer feedback.',
        documents: [
            { name: 'Viewing schedule', available: true },
            { name: 'Buyer feedback', available: false },
        ],
    },
    {
        label: 'Offer and negotiation',
        description: 'Review offers and agree on the terms of sale.',
        documents: [
            { name: 'Purchase offer', available: true },
            { name: 'Reservation agreement', available: false },
        ],
    },
    {
        label: 'Closing',
        description: 'Complete the sale and hand over the keys.',
        documents: [
            { name: 'Sale contract', available: true },
            { name: 'Handover report', available: false },
        ],
    },
];

// Track competition submissions rather than construction milestones.
const competitionSteps = [
    {
        label: 'Brief and research',
        description: 'Review the competition brief and site constraints.',
        documents: [
            { name: 'Competition brief', available: true },
            { name: 'Site analysis', available: true },
        ],
    },
    {
        label: 'Concept design',
        description: 'Develop the proposal and prepare presentation material.',
        documents: [
            { name: 'Concept drawings', available: true },
            { name: 'Presentation boards', available: false },
        ],
    },
    {
        label: 'Submission',
        description: 'Submit the proposal for jury review.',
        documents: [
            { name: 'Submission package', available: false },
            { name: 'Jury feedback', available: false },
        ],
    },
];

/** Shows three local organization views in an interactive homepage preview. */
export function Showcase() {
    // Keep navigation within the preview without changing the homepage URL.
    const [navigation, setNavigation] = useState<
        { page: 'organizations' } | { page: 'solutions'; organizationId: string }
    >({ page: 'organizations' });

    const [tab, setTab] = useState('');
    const [projectId, setProjectId] = useState<number | null>(null);
    const [phaseIndex, setPhaseIndex] = useState<number | null>(null);
    const [subphaseCode, setSubphaseCode] = useState<string | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);

    // Resolve each organization's records and lifecycle before opening optional details.
    const organization =
        navigation.page === 'organizations'
            ? undefined
            : organizations.find((item) => item.id === navigation.organizationId);

    const activeTab = organization?.tabs.find((item) => item === tab) ?? organization?.tabs[0] ?? 'Organizations';

    const records =
        organization?.id === 'real-estate'
            ? properties.filter((property) => property.category === activeTab)
            : activeTab === 'Competitions'
              ? competitions
              : projects;

    const steps =
        organization?.id === 'real-estate'
            ? propertySteps
            : activeTab === 'Competitions'
              ? competitionSteps
              : projectSteps;

    const activeProject = records.find((project) => project.id === projectId);
    const activePhase = activeProject ? steps[phaseIndex ?? 0] : undefined;

    const activeSubphase =
        activePhase && 'subphases' in activePhase
            ? activePhase.subphases.find((subphase) => subphase.code === subphaseCode)
            : undefined;

    // Project Views have their own navigation, independent of organization categories.
    const projectTabs = steps.map((phase, index) => ({
        id: String(index),
        label: `${index + 1}. ${phase.label}`,
        icon: ListChecks,
    }));

    const projectView = String(phaseIndex ?? 0);

    // Keep the preview window's size while scaling its contents to 80%.
    return (
        <Section
            className="hidden sm:block"
            paddingInline={6}
            paddingBlockEnd={10}
            variant="transparent"
            aria-label="Example Showcase"
        >
            <Section
                padding={0}
                width="100%"
                maxWidth={1000}
                height="clamp(420px, 62.5vw, 625px)"
                className="mx-auto my-0 overflow-hidden rounded-lg border border-border-strong bg-surface shadow-lg"
            >
                <Layout
                    height="fill"
                    padding={0}
                    header={
                        <Stack
                            direction="horizontal"
                            gap={1.5}
                            align="center"
                            paddingInline={3}
                            aria-hidden="true"
                            className="h-6 shrink-0 border-b border-border bg-muted"
                        >
                            <Icon
                                icon={Circle}
                                size="xsm"
                                className="fill-(--color-window-close) stroke-(--color-window-close)"
                            />
                            <Icon
                                icon={Circle}
                                size="xsm"
                                className="fill-(--color-window-minimize) stroke-(--color-window-minimize)"
                            />
                            <Icon
                                icon={Circle}
                                size="xsm"
                                className="fill-(--color-window-maximize) stroke-(--color-window-maximize)"
                            />
                        </Stack>
                    }
                    content={
                        <LayoutContent
                            padding={0}
                            isScrollable={false}
                            role="region"
                            label="Interactive organization showcase"
                        >
                            <PlatformFrame
                                height="fill"
                                className="h-full zoom-80"
                                breadcrumb={
                                    <Breadcrumbs separator=">" variant="supporting" label="Showcase breadcrumb">
                                        <BreadcrumbItem
                                            href="#showcase-organizations"
                                            onClick={(event) => {
                                                // Return to the organization list without leaving the homepage.
                                                event.preventDefault();
                                                setNavigation({ page: 'organizations' });
                                                setTab('');
                                                setProjectId(null);
                                                setPhaseIndex(null);
                                                setSubphaseCode(null);
                                            }}
                                        >
                                            <Wordmark />
                                        </BreadcrumbItem>
                                        {organization && (
                                            <BreadcrumbItem
                                                href={
                                                    activeProject ? `#showcase-${organization.id}-solutions` : undefined
                                                }
                                                isCurrent={!activeProject}
                                                onClick={(event) => {
                                                    // Return from record details to the organization's overview.
                                                    event.preventDefault();
                                                    setNavigation({
                                                        page: 'solutions',
                                                        organizationId: organization.id,
                                                    });
                                                    setProjectId(null);
                                                    setPhaseIndex(null);
                                                    setSubphaseCode(null);
                                                }}
                                            >
                                                {organization.name}
                                            </BreadcrumbItem>
                                        )}
                                        {activeProject && (
                                            <BreadcrumbItem
                                                href={activePhase ? `#showcase-project-${activeProject.id}` : undefined}
                                                isCurrent={!activePhase}
                                                onClick={(event) => {
                                                    // Return to the project's first phase.
                                                    event.preventDefault();
                                                    setPhaseIndex(null);
                                                    setSubphaseCode(null);
                                                }}
                                            >
                                                {activeProject.name}
                                            </BreadcrumbItem>
                                        )}
                                        {activePhase && (
                                            <BreadcrumbItem
                                                href={activeSubphase ? `#showcase-phase-${phaseIndex}` : undefined}
                                                isCurrent={!activeSubphase}
                                                onClick={(event) => {
                                                    // Return from required documents to the parent phase's sub-phases.
                                                    event.preventDefault();
                                                    setSubphaseCode(null);
                                                }}
                                            >
                                                {activePhase.label}
                                            </BreadcrumbItem>
                                        )}
                                        {activeSubphase && (
                                            <BreadcrumbItem isCurrent>
                                                {activeSubphase.code} – {activeSubphase.label}
                                            </BreadcrumbItem>
                                        )}
                                    </Breadcrumbs>
                                }
                                action={
                                    <Popover
                                        alignment="end"
                                        isOpen={profileOpen}
                                        label="Anna Keller"
                                        onOpenChange={setProfileOpen}
                                        width={280}
                                        content={
                                            <Stack gap={2} width="100%">
                                                <Item
                                                    description="anna.keller@example.com"
                                                    label="Anna Keller"
                                                    startContent={<Avatar name="Anna Keller" />}
                                                />
                                                <Divider />
                                                <List
                                                    density="compact"
                                                    header={
                                                        <Text color="secondary" type="label">
                                                            Account
                                                        </Text>
                                                    }
                                                >
                                                    <ListItem
                                                        label="Organizations"
                                                        href="#showcase-user-Organizations"
                                                        endContent={
                                                            <ChevronRight
                                                                aria-hidden="true"
                                                                className="text-secondary"
                                                                size={12}
                                                            />
                                                        }
                                                        startContent={
                                                            <Building2
                                                                aria-hidden="true"
                                                                className="text-secondary"
                                                                size={16}
                                                            />
                                                        }
                                                        onClick={(event) => {
                                                            // Keep profile navigation inside the local account preview.
                                                            event.preventDefault();
                                                            setNavigation({ page: 'organizations' });
                                                            setTab('');
                                                            setProjectId(null);
                                                            setPhaseIndex(null);
                                                            setSubphaseCode(null);
                                                            setProfileOpen(false);
                                                        }}
                                                    />
                                                    <ListItem
                                                        href="/docs/"
                                                        label="Documentation"
                                                        target="_blank"
                                                        startContent={
                                                            <BookOpen
                                                                aria-hidden="true"
                                                                className="text-secondary"
                                                                size={16}
                                                            />
                                                        }
                                                        endContent={
                                                            <ExternalLink
                                                                aria-hidden="true"
                                                                className="text-secondary"
                                                                size={12}
                                                            />
                                                        }
                                                        onClickCapture={() => setProfileOpen(false)}
                                                    />
                                                </List>
                                                <Button
                                                    label="Sign out"
                                                    variant="destructive"
                                                    isDisabled
                                                    tooltip="This preview is not signed in."
                                                />
                                            </Stack>
                                        }
                                    >
                                        <IconButton
                                            icon={<Avatar name="Anna Keller" />}
                                            label="Anna Keller"
                                            variant="ghost"
                                        />
                                    </Popover>
                                }
                                navigation={
                                    <TabList
                                        value={activeProject ? projectView : activeTab}
                                        onChange={(value) => {
                                            // Keep project View navigation separate from organization categories.
                                            if (activeProject) {
                                                setPhaseIndex(Number(value));
                                            } else {
                                                setTab(value);
                                                setPhaseIndex(null);
                                            }

                                            setSubphaseCode(null);
                                        }}
                                        role="tablist"
                                        aria-label={
                                            activeProject
                                                ? `${activeProject.name} Views`
                                                : organization
                                                  ? `${organization.name} Solution categories`
                                                  : 'Section navigation'
                                        }
                                        size="sm"
                                    >
                                        {activeProject ? (
                                            projectTabs.map((item) => (
                                                <Tab
                                                    key={item.id}
                                                    value={item.id}
                                                    label={item.label}
                                                    panelId={`showcase-project-${activeProject.id}-${item.id}`}
                                                    icon={<item.icon aria-hidden="true" size={16} />}
                                                />
                                            ))
                                        ) : organization ? (
                                            organization.tabs.map((item) => (
                                                <Tab
                                                    key={item}
                                                    value={item}
                                                    label={item}
                                                    panelId={`showcase-${organization.id}-${item.replaceAll(' ', '-')}`}
                                                    icon={
                                                        item === 'Competitions' ? (
                                                            <Trophy aria-hidden="true" size={16} />
                                                        ) : organization.id === 'finance' ? (
                                                            <ChartNoAxesCombined aria-hidden="true" size={16} />
                                                        ) : item === 'Projects' ? (
                                                            <Folder aria-hidden="true" size={16} />
                                                        ) : (
                                                            <Building2 aria-hidden="true" size={16} />
                                                        )
                                                    }
                                                />
                                            ))
                                        ) : (
                                            <Tab
                                                value="Organizations"
                                                label="Organizations"
                                                panelId="showcase-user-Organizations"
                                                icon={<Building2 aria-hidden="true" size={16} />}
                                            />
                                        )}
                                    </TabList>
                                }
                            >
                                <PageContainer minHeight="100%" gap={8} padding={2}>
                                    <Stack
                                        gap={4}
                                        id={
                                            activeProject
                                                ? `showcase-project-${activeProject.id}-${projectView}`
                                                : `showcase-${organization?.id ?? 'user'}-${activeTab.replaceAll(' ', '-')}`
                                        }
                                        role="tabpanel"
                                        aria-label={
                                            activeProject
                                                ? projectTabs.find((item) => item.id === projectView)?.label
                                                : activeTab
                                        }
                                        tabIndex={0}
                                    >
                                        {!organization ? (
                                            <>
                                                <Stack
                                                    direction="horizontal"
                                                    justify="between"
                                                    align="center"
                                                    wrap="wrap"
                                                    className="min-h-12"
                                                >
                                                    <Heading level={1}>Organizations</Heading>
                                                    <Button
                                                        label="Create Organization"
                                                        isDisabled
                                                        tooltip="Organization creation is unavailable in this preview."
                                                    />
                                                </Stack>
                                                <Table
                                                    data={[...organizations]}
                                                    idKey="id"
                                                    density="compact"
                                                    hasHover
                                                    columns={[
                                                        {
                                                            key: 'name',
                                                            header: 'Name',
                                                            width: proportional(1),
                                                            renderCell: (item) => (
                                                                <Stack direction="horizontal" gap={3} align="center">
                                                                    <Avatar kind="organization" name={item.name} />
                                                                    <Stack gap={0} align="start">
                                                                        <Link
                                                                            href={`#showcase-${item.id}-solutions`}
                                                                            onClick={(event) => {
                                                                                // Open this organization's Solutions without navigating away.
                                                                                event.preventDefault();
                                                                                setNavigation({
                                                                                    page: 'solutions',
                                                                                    organizationId: item.id,
                                                                                });
                                                                                setTab('');
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                        <Text type="supporting">
                                                                            {item.description}
                                                                        </Text>
                                                                    </Stack>
                                                                </Stack>
                                                            ),
                                                        },
                                                    ]}
                                                />
                                            </>
                                        ) : activeProject ? (
                                            <Stack gap={4}>
                                                {activePhase ? (
                                                    <Stack gap={0}>
                                                        <Heading level={2}>
                                                            {activeSubphase
                                                                ? `${activeSubphase.code} – ${activeSubphase.label}`
                                                                : activePhase.label}
                                                        </Heading>
                                                        <Text type="supporting">{activePhase.description}</Text>
                                                    </Stack>
                                                ) : (
                                                    <Stack direction="horizontal" align="center" gap={2}>
                                                        <Thumbnail
                                                            src={`/images/showcase/${activeProject.photo}.jpg`}
                                                            alt={`${activeProject.name} building`}
                                                            label={activeProject.name}
                                                            className="w-10!"
                                                        />
                                                        <Stack gap={0}>
                                                            <Heading level={2}>{activeProject.name}</Heading>
                                                            <Text type="supporting">{activeProject.description}</Text>
                                                        </Stack>
                                                    </Stack>
                                                )}
                                                <Divider />
                                                <Layout
                                                    height="auto"
                                                    padding={0}
                                                    content={
                                                        <LayoutContent isScrollable={false}>
                                                            <Stack paddingInlineEnd={8}>
                                                                {activeSubphase ? (
                                                                    <Table
                                                                        data={activeSubphase.documents.map((name) => ({
                                                                            name,
                                                                        }))}
                                                                        idKey="name"
                                                                        density="compact"
                                                                        columns={[
                                                                            {
                                                                                key: 'name',
                                                                                header: 'Required document',
                                                                                width: proportional(1),
                                                                            },
                                                                        ]}
                                                                    />
                                                                ) : activePhase && 'subphases' in activePhase ? (
                                                                    <Stepper
                                                                        activeStep={0}
                                                                        orientation="vertical"
                                                                        density="compact"
                                                                        label={`${activePhase.label} sub-phases`}
                                                                        onStepClick={(index) => {
                                                                            // Open the required documents for the selected SIA sub-phase.
                                                                            setSubphaseCode(
                                                                                activePhase.subphases[index]?.code ??
                                                                                    null
                                                                            );
                                                                        }}
                                                                    >
                                                                        {activePhase.subphases.map(
                                                                            (subphase, index) => (
                                                                                <Step
                                                                                    key={subphase.code}
                                                                                    step={index}
                                                                                    indicator={subphase.code}
                                                                                    label={subphase.label}
                                                                                    description={`${subphase.documents.length} required documents`}
                                                                                />
                                                                            )
                                                                        )}
                                                                    </Stepper>
                                                                ) : activePhase ? (
                                                                    <Table
                                                                        data={activePhase.documents}
                                                                        idKey="name"
                                                                        density="compact"
                                                                        verticalAlign="top"
                                                                        columns={[
                                                                            {
                                                                                key: 'name',
                                                                                header: 'Document',
                                                                                width: proportional(1),
                                                                                renderCell: (document) => (
                                                                                    <CheckboxInput
                                                                                        label={document.name}
                                                                                        size="sm"
                                                                                        value={document.available}
                                                                                        isReadOnly
                                                                                    />
                                                                                ),
                                                                            },
                                                                        ]}
                                                                    />
                                                                ) : null}
                                                            </Stack>
                                                        </LayoutContent>
                                                    }
                                                    end={
                                                        <LayoutPanel
                                                            width="30%"
                                                            isScrollable={false}
                                                            role="complementary"
                                                            label={
                                                                organization.id === 'real-estate'
                                                                    ? 'Property details'
                                                                    : 'Project details'
                                                            }
                                                        >
                                                            <Stack gap={2}>
                                                                <Badge label={activeProject.status} />
                                                                <Stack gap={2}>
                                                                    <Text type="supporting">
                                                                        {organization.id === 'real-estate'
                                                                            ? 'Listing agent'
                                                                            : 'Project owner'}
                                                                    </Text>
                                                                    <Stack
                                                                        direction="horizontal"
                                                                        align="center"
                                                                        gap={2}
                                                                    >
                                                                        <Avatar name={activeProject.owner} size="sm" />
                                                                        <Stack gap={0}>
                                                                            <Text>{activeProject.owner}</Text>
                                                                            <Text type="supporting">
                                                                                {activeProject.ownerEmail}
                                                                            </Text>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Stack>
                                                            </Stack>
                                                        </LayoutPanel>
                                                    }
                                                />
                                            </Stack>
                                        ) : (
                                            <>
                                                <Stack
                                                    direction="horizontal"
                                                    justify="between"
                                                    align="center"
                                                    wrap="wrap"
                                                    className="min-h-12"
                                                >
                                                    <Heading level={1}>{activeTab}</Heading>
                                                </Stack>
                                                {organization.id === 'real-estate' && (
                                                    <Grid columns={{ minWidth: 240, max: 3 }} gap={4} align="stretch">
                                                        {records.map((property) => (
                                                            <Card
                                                                key={property.id}
                                                                label={property.name}
                                                                padding={0}
                                                                height="100%"
                                                                isClipped
                                                                onClick={() => {
                                                                    // Open the property's Solution from either listing category.
                                                                    setProjectId(property.id);
                                                                    setPhaseIndex(null);
                                                                    setSubphaseCode(null);
                                                                }}
                                                            >
                                                                <Stack gap={0} height="100%">
                                                                    <img
                                                                        src={`/images/showcase/${property.photo}.jpg`}
                                                                        alt={`${property.name} building`}
                                                                        className="aspect-video w-full object-cover"
                                                                        loading="lazy"
                                                                    />
                                                                    <Stack gap={3} padding={4}>
                                                                        <Stack gap={1} align="start">
                                                                            <Heading level={3}>{property.name}</Heading>
                                                                            <Badge
                                                                                label={property.status}
                                                                                variant={
                                                                                    property.status === 'Sold'
                                                                                        ? 'success'
                                                                                        : property.status ===
                                                                                            'Under offer'
                                                                                          ? 'warning'
                                                                                          : 'neutral'
                                                                                }
                                                                            />
                                                                        </Stack>
                                                                        <Text type="supporting">
                                                                            {property.description}
                                                                        </Text>
                                                                        <Stack
                                                                            direction="horizontal"
                                                                            gap={2}
                                                                            align="center"
                                                                        >
                                                                            <Avatar name={property.owner} size="sm" />
                                                                            <Text type="supporting">
                                                                                {property.owner}
                                                                            </Text>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Stack>
                                                            </Card>
                                                        ))}
                                                    </Grid>
                                                )}
                                                {organization.id === 'architecture' && (
                                                    <Table
                                                        data={records}
                                                        idKey="id"
                                                        density="compact"
                                                        hasHover
                                                        columns={[
                                                            {
                                                                key: 'name',
                                                                header: 'Solution',
                                                                width: proportional(1),
                                                                renderCell: (project) => (
                                                                    <Stack gap={0}>
                                                                        <Link
                                                                            href={`#showcase-project-${project.id}`}
                                                                            onClick={(event) => {
                                                                                // Open each project as its own Solution without leaving the preview.
                                                                                event.preventDefault();
                                                                                setProjectId(project.id);
                                                                                setPhaseIndex(null);
                                                                                setSubphaseCode(null);
                                                                            }}
                                                                        >
                                                                            {project.name}
                                                                        </Link>
                                                                        <Text type="supporting">
                                                                            {project.description}
                                                                        </Text>
                                                                    </Stack>
                                                                ),
                                                            },
                                                        ]}
                                                    />
                                                )}
                                                {organization.id === 'finance' && activeTab === 'Fixed Income' && (
                                                    <Table
                                                        data={companies}
                                                        idKey="name"
                                                        density="compact"
                                                        hasHover
                                                        columns={[
                                                            { key: 'name', header: 'Company', width: proportional(2) },
                                                            {
                                                                key: 'industry',
                                                                header: 'Industry',
                                                                width: proportional(1),
                                                            },
                                                            {
                                                                key: 'country',
                                                                header: 'Country',
                                                                width: proportional(1),
                                                            },
                                                        ]}
                                                    />
                                                )}
                                                {organization.id === 'finance' && activeTab !== 'Fixed Income' && (
                                                    <Table
                                                        data={activeTab === 'ETFs' ? funds : stocks}
                                                        idKey="symbol"
                                                        density="compact"
                                                        hasHover
                                                        columns={[
                                                            {
                                                                key: 'symbol',
                                                                header: activeTab === 'ETFs' ? 'Fund' : 'Stock',
                                                                width: proportional(2),
                                                                renderCell: (stock) => (
                                                                    <Stack gap={0}>
                                                                        <Text>{stock.symbol}</Text>
                                                                        <Text type="supporting">{stock.name}</Text>
                                                                    </Stack>
                                                                ),
                                                            },
                                                            {
                                                                key: 'price',
                                                                header: 'Price (USD)',
                                                                align: 'end',
                                                                renderCell: (stock) => usd.format(stock.price),
                                                            },
                                                            {
                                                                key: 'change',
                                                                header: 'Daily change',
                                                                align: 'end',
                                                                renderCell: (stock) => (
                                                                    <Text>
                                                                        {stock.change > 0 ? '+' : ''}
                                                                        {stock.change.toFixed(2)}%
                                                                    </Text>
                                                                ),
                                                            },
                                                            { key: 'shares', header: 'Shares', align: 'end' },
                                                            {
                                                                key: 'value',
                                                                header: 'Value (USD)',
                                                                align: 'end',
                                                                renderCell: (stock) =>
                                                                    usd.format(stock.price * stock.shares),
                                                            },
                                                        ]}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Stack>
                                </PageContainer>
                            </PlatformFrame>
                        </LayoutContent>
                    }
                />
            </Section>
        </Section>
    );
}
