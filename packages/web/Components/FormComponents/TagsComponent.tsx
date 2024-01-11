import {
  FormControl, Icon, Tag, TagCloseButton, TagLabel, Text, Tooltip,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import BoxCard from '../../styles/boxCard';
import { InputHintNo, InputHintOk } from '../../styles/InputHint';
import { FormItemProp, FormItemState } from './TitleComponent';

interface FormTagsState extends FormItemState {
  currentText: string,
  currentTags: string [],
}

export default class FormTagsCard extends React.Component<FormItemProp, FormTagsState > {
  input : FormItemProp;

  type = 'TagsCard';

  constructor(functionPass:FormItemProp) {
    super(functionPass);
    const initArray = functionPass.value === '' ? [] : functionPass.value.split(',');
    this.input = functionPass;
    this.state = {
      valueValid: false,
      currentText: '',
      currentTags: initArray,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleonSubmit = this.handleonSubmit.bind(this);
    this.handleDeleteTag = this.handleDeleteTag.bind(this);
  }

  componentDidUpdate(prevProps :FormItemProp) {
    const { value } = this.props;
    const initArray = value === '' ? [] : value.split(',');
    if (prevProps.value !== value) {
      if (value === '') {
        this.setState({ currentText: '', valueValid: false, currentTags: initArray });
      }
    }
  }

  handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { value } = target;
    const { currentTags } = this.state;

    if (value === ',') { return; }
    this.setState({
      valueValid: currentTags.length >= 3,
      currentText: value,
    });
  }

  handleonSubmit(e: KeyboardEvent) {
    const { currentText, currentTags } = this.state;
    const newText = currentText.replaceAll(' ', '').replaceAll(',', '');
    if ((e.key === 'Enter' || e.key === ',') && !(currentTags.includes(newText)) && newText.length > 0) {
      const newArray = currentTags;
      newArray.push(newText);
      this.setState({ valueValid: (currentTags.length >= 3), currentText: '', currentTags: newArray });
      this.input.inputCallback(this.type, (currentTags.length >= 3), currentTags.toString());
    }
  }

  handleDeleteTag(index: number) {
    const { currentTags } = this.state;
    currentTags.splice(index, 1);
    this.setState({ valueValid: (currentTags.length >= 3), currentTags });
    this.input.inputCallback(this.type, (currentTags.length >= 3), currentTags.toString());
  }

  render() {
    const { valueValid, currentTags, currentText } = this.state;
    const shouldAutoFocus = currentTags.length > 0;
    const input = valueValid ? (
      <InputHintOk
        onKeyDown={this.handleonSubmit}
        autoFocus={shouldAutoFocus}
        value={currentText}
        placeholder="Étiquette"
        onChange={this.handleUserInput}
      />
    ) : (
      <InputHintNo
        onKeyDown={this.handleonSubmit}
        autoFocus={shouldAutoFocus}
        value={currentText}
        placeholder="Étiquette"
        onChange={this.handleUserInput}
      />
    );

    const toolTip = !valueValid ? (
      <Tooltip label="Il faut un minimum de 3 étiquettes. Les étiquettes doivent être différentes." fontSize="md">
        <Icon name="question circle outline" />
      </Tooltip>
    ) : (null);

    return (
      <BoxCard>
        <Text fontSize="2xl" textAlign="left">Étiquettes</Text>
        <Text textAlign="left">Créez des étiquettes supplémentaires pour ajouter des termes afin de faciliter la recherche de cours. Utiliser entrer ou , pour créer des étiquettes. Exemple suggérés d&apos;étiquettes : Sigle du cours, nom de l&apos;université...</Text>
        <FormControl display="flex" alignItems="center" p="5">
          { currentTags.map((tag, index) => (
            <Tag key={tag} colorScheme="blue">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => this.handleDeleteTag(index)} />
            </Tag>
          ))}

        </FormControl>
        {input}
        {toolTip}
      </BoxCard>
    );
  }
}
