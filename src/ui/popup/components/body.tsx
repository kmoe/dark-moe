import {m} from 'malevic';
import {getContext} from 'malevic/dom';
import {withForms} from 'malevic/forms';
import {withState, useState} from 'malevic/state';
import {TabPanel, Button} from '../../controls';
import FilterSettings from './filter-settings';
import {Header, MoreToggleSettings} from './header';
import Loader from './loader';
import NewBody from '../body';
import MoreSettings from './more-settings';
import SiteListSettings from './site-list-settings';
import {getDuration} from '../../../utils/time';
import {DONATE_URL, GITHUB_URL, PRIVACY_URL, TWITTER_URL, getHelpURL} from '../../../utils/links';
import {getLocalMessage} from '../../../utils/locales';
import {compose, openExtensionPage} from '../../utils';
import type {ExtensionData, ExtensionActions} from '../../../definitions';
import {isMobile} from '../../../utils/platform';

declare const __THUNDERBIRD__: boolean;

interface BodyProps {
    data: ExtensionData;
    actions: ExtensionActions;
}

interface BodyState {
    activeTab: string;
    moreToggleSettingsOpen: boolean;
}

async function openDevTools() {
    await openExtensionPage('devtools');
}

function Body(props: BodyProps & {fonts: string[]}) {
    const context = getContext();
    const {state, setState} = useState<BodyState>({
        activeTab: 'Filter',
        moreToggleSettingsOpen: false,
    });

    if (!props.data.isReady) {
        return (
            <body>
                <Loader complete={false} />
            </body>
        );
    }

    if (isMobile || props.data.settings.previewNewDesign) {
        return <NewBody {...props} fonts={props.fonts}/>;
    }

    function toggleMoreToggleSettings() {
        setState({moreToggleSettingsOpen: !state.moreToggleSettingsOpen});
    }

    return (
        <body class={{'ext-disabled': !props.data.isEnabled}}>
            <Loader complete />

            <Header
                data={props.data}
                actions={props.actions}
                onMoreToggleSettingsClick={toggleMoreToggleSettings}
            />

            <TabPanel
                activeTab={state.activeTab}
                onSwitchTab={(tab) => setState({activeTab: tab})}
                tabs={__THUNDERBIRD__ ? {
                    'Filter': (
                        <FilterSettings data={props.data} actions={props.actions} />
                    ),
                    'More': (
                        <MoreSettings data={props.data} actions={props.actions} fonts={props.fonts}/>
                    ),
                } : {
                    'Filter': (
                        <FilterSettings data={props.data} actions={props.actions} />
                    ),
                    'Site list': (
                        <SiteListSettings data={props.data} actions={props.actions} isFocused={state.activeTab === 'Site list'} />
                    ),
                    'More': (
                        <MoreSettings data={props.data} actions={props.actions} fonts={props.fonts}/>
                    ),
                }}
                tabLabels={{
                    'Filter': getLocalMessage('filter'),
                    'Site list': getLocalMessage('site_list'),
                    'More': getLocalMessage('more'),
                }}
            />

            <footer>
                <div class="footer-links">
                </div>
                <div class="footer-buttons">
                    <a class="donate-link" href={DONATE_URL} target="_blank" rel="noopener noreferrer">
                        <span class="donate-link__text">{getLocalMessage('donate')}</span>
                    </a>
                    <Button onclick={openDevTools} class="dev-tools-button">
                        {getLocalMessage('open_dev_tools')}
                    </Button>
                </div>
            </footer>
            <MoreToggleSettings
                data={props.data}
                actions={props.actions}
                isExpanded={state.moreToggleSettingsOpen}
                onClose={toggleMoreToggleSettings}
            />
        </body>
    );
}

export default compose(Body, withState, withForms);
