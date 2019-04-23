# Starred

This is how Starred component implementation can look like:

in **NitroBridge** component:

For more detailed info, pls check: [WIP: Nitro-Starred](https://gitlab.skypicker.com/frontend/search/merge_requests/147)

```js
import {
 goToJourney as _goToJourney,
 removeItem as _removeItem,
 removeAllItems as _removeAllItems,
 setItems as _setItems,
} from "common/services/starred/starredDuck"

import {
 starredSelector,
 starredItemBaseUrlGetterSelector,
} from "common/services/starred/starredSelectors"

import { isMobileSelector } from "common/services/window"
import { setNotice as _setNotice } from "common/services/notice"
import { getLanguageInfo } from "common/services/staticData"

import Dialog from "common/components/JourneyActionButtons/ShareDialog"

type Props = {|
	//starred
	 starredStore: StarredStore,
	 isMobile: boolean,
	 shareUrl: string,
	 getLangInfo: LanguageInfo,
	 goToJourneyNitro: typeof _goToJourneyNitro,
	 removeItem: typeof _removeItem,
	 removeAllItems: typeof _removeAllItems,
	 setNotice: typeof _setNotice
|}

const ShareDialogComponent = ({
 shareUrl,
 journey,
 passengers,
 cabinClass,
 isMobile,
 getLangInfo,
 setNotice,
 onClose,
}: ShareDialog) => (
	 <Dialog
	 url={shareUrl}
	 journey={journey}
	 isMobile={isMobile}
	 passengers={passengers}
	 cabinClass={cabinClass}
	 language={getLangInfo}
	 setNotice={setNotice}
	 onClose={onClose}
	 fixed
	 shareDetached
	 shareEnabled
	 starActive
	 starEnabled
	 />
)

const NitroBridge = ({
	 lang,
	 children,
	 // starred
	 removeAllItems,
	 shareUrl,
	 removeItem,
	 isMobile,
	 getLangInfo,
	 setNotice,
	 onGoToStarred: goToJourney,
	 ...etc
}) =>
	...
	<StarredProvider
		 value={{
		 starredList: starredStore.items,
		 onRemove: removeItem,
		 onAdd: () => {},
		 shareUrl,
		 isMobile,
		 lang: getLangInfo,
		 onClear: removeAllItems,
		 ShareDialog: ShareDialogComponent,
		 onGoToStarred,
		 setNotice,
		 }}
		 >
		  {children}
	</StarredProvider>


const connector: Connector<OwnProps, Props> = connect(
	 state => ({
		 // starred
		 lang: getLanguage(state),
		 starredStore: starredNitroSelector(state),
		 shareUrl: starredItemBaseUrlGetterSelector(state),
		 isMobile: isMobileSelector(state),
		 getLangInfo: getLanguageInfo(state)
	 ...etc
	 )},
	  dispatch => ({
		 // starred
		 goToJourney: item => dispatch(_goToJourney(item)),
		 removeItem: id => dispatch(_removeItem(id)),
		 removeAllItems: () => dispatch(_removeAllItems()),
		 setNotice: () => dispatch(_setNotice),
 })
```
