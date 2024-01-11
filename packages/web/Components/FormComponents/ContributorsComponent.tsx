/* eslint-disable import/extensions */
import {
  FormControl, Tag, TagCloseButton, TagLabel, Text,
} from '@chakra-ui/react';
import { httpsCallable } from 'firebase/functions';
import React, { ChangeEvent } from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { auth, firebaseFunctionsEmulator } from '../../pages/global';
import BoxCard from '../../styles/boxCard';
import { FormItemProp, FormItemState } from './TitleComponent';

interface FormContributorState extends FormItemState {
  currentText: string,
  currentTags: string [],
  availableContributors: string[],
}

class FormContributorCard extends React.Component<FormItemProp, FormContributorState > {
  input : FormItemProp;

  type = 'ContributorCard';

  listTeacherEmails = httpsCallable(firebaseFunctionsEmulator, 'listTeacherEmails');

  constructor(functionPass:FormItemProp) {
    super(functionPass);
    this.input = functionPass;
    const initArray = functionPass.value === '' ? [] : functionPass.value.split(',');
    this.state = {
      valueValid: true,
      currentTags: initArray,
      currentText: '',
      availableContributors: [],
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
  }

  componentDidMount() {
    this.afterContructor();
  }

  componentDidUpdate(prevProps :FormItemProp) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      if (value === '') {
        this.setState({ currentText: value, currentTags: [] });
      }
    }
  }

  handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { value } = target;
    this.setState({ currentText: value });
  }

  handleContributorClick(value:string) {
    const { currentTags, valueValid } = this.state;
    if (!(currentTags.includes(value))) { currentTags.push(value); }
    this.setState({ currentTags, currentText: '' });
    this.input.inputCallback(this.type, valueValid, currentTags.toString());
  }

  handleDeleteTag(index: number) {
    const { currentTags, valueValid } = this.state;
    currentTags.splice(index, 1);
    this.setState({ currentTags });
    this.input.inputCallback(this.type, valueValid, currentTags.toString());
  }

  afterContructor = () => {
    this.listTeacherEmails({}).then((result) => {
      const arrayList = result.data as string[];
      const findEmail = (email: string) => email === auth.currentUser?.email;
      const idx = arrayList.findIndex(findEmail);
      arrayList.splice(idx, 1);
      this.setState({ availableContributors: arrayList });
    });
  };

  render() {
    const {
      currentTags, currentText, availableContributors,
    } = this.state;
    return (
      <BoxCard>
        <Text fontSize="2xl" textAlign="left">Contributeurs</Text>
        <Text textAlign="left">Ajoutez des contributeurs au cours pour qu’ils puissent apporter des modifications au contenu. (Optionnel)</Text>
        <FormControl display="flex" alignItems="center" p="5">
          { currentTags.map((tag, index) => (
            <Tag key={tag} colorScheme="blue">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => this.handleDeleteTag(index)} />
            </Tag>
          ))}

        </FormControl>
        <AutoComplete openOnFocus maxSuggestions={4}>
          <AutoCompleteInput variant="filled" placeholder="email.contibuteur@polymt.ca" value={currentText} onChange={this.handleUserInput} />
          <AutoCompleteList>
            {availableContributors.map((email) => (
              <AutoCompleteItem
                key={`option-${email}`}
                value={email}
                onClick={() => { this.handleContributorClick(email); }}
              >
                {email}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </BoxCard>

    );
  }
}

export default FormContributorCard;
