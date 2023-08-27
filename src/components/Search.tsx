import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomInput, SearchButton } from './ui';
import { isPlatformWeb } from '@rnv/renative';

type SearchPropsType = {
  handleChange: (newQuery: string) => void;
  setMessage: Dispatch<SetStateAction<string>>;
  query: string;
};

const Search: FC<SearchPropsType> = ({
  handleChange,
  setMessage,
  query: initialQuery,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const [isFocused, setIsFocused] = useState(false);

  const handleChangeInput = (newQuery: string) => {
    setQuery(newQuery.trim());

    if (newQuery.trim() === '') {
      handleChange('');
    } else {
      setMessage('');
    }
  };

  useEffect(() => {
    setQuery(initialQuery);
    setMessage('');
  }, [initialQuery]);

  const handleSubmit = () => {
    if (query === '') {
      setMessage('Enter the title in the search field.');
    } else {
      setMessage('');
      handleChange(query);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomInput
          placeholder={'Search movie by title...'}
          value={query}
          onChangeText={handleChangeInput}
          setInputFocused={setIsFocused}
          onEndEditing={handleSubmit}
        />
        <SearchButton isFocused={isFocused} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
  },
  innerContainer: {
    position: 'relative',
    maxWidth: 450,
    width: isPlatformWeb ? 600 : 'auto',
  },
});
