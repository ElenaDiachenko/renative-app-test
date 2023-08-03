import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { enableScreens } from 'react-native-screens';

import Navigation from '../navigation';

function App(): JSX.Element {
  enableScreens(true);
  const [initializing, setInitializing] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await checkUser();
  //       setInitializing(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [checkUser]);

  // const myTVEventHandler = (evt: {eventType: React.SetStateAction<string>}) => {
  //   setLastEventType(evt.eventType);
  //   console.log(evt, 'EVENT');
  // };
  // console.log(lastEventType);
  // useTVEventHandler(myTVEventHandler);

  // if (initializing) {
  //   return <></>;
  // }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
