import { Text, Textarea } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import BoxCard from '../../styles/boxCard';
import { FormItemProp, FormItemState } from './TitleComponent';

interface FormDescriptionState extends FormItemState {
  currentText: string,
  valueValid: boolean,
}

export default class FormDescriptionCard extends React.Component<FormItemProp,
 FormDescriptionState > {
  input : FormItemProp;

  type = 'DescriptionCard';

  constructor(functionPass:FormItemProp) {
    super(functionPass);
    this.input = functionPass;
    this.state = {
      valueValid: false,
      currentText: '',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidUpdate(prevProps :FormItemProp) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.setState({ currentText: value });
    }
  }

  handleUserInput(e: ChangeEvent<HTMLTextAreaElement>) {
    const { target } = e;
    const { value } = target;
    this.setState({ valueValid: true, currentText: value });
    this.input.inputCallback(this.type, true, value);
  }

  render() {
    const { valueValid, currentText } = this.state;
    const border = valueValid ? 'none' : 'solid 5px red';
    return (
      <BoxCard>
        <Text fontSize="2xl" textAlign="left">Description</Text>
        <Text textAlign="left">
          Ajoutez une courte description du cours et des activités sur
          l’application. (Optionnel)
        </Text>
        <Textarea border={border} value={currentText} onChange={this.handleUserInput} placeholder="(optionnel)" />
      </BoxCard>
    );
  }
}
