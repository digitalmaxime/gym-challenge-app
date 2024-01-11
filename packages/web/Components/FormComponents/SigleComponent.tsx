import { Icon, Text, Tooltip } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import BoxCard from '../../styles/boxCard';

import { InputHintOk, InputHintNo } from '../../styles/InputHint';
import { FormItemProp } from './TitleComponent';

export interface FormItemState {
  valueValid: boolean,
}

interface FormSigleState extends FormItemState {
  sigle: string,
}

export class FormSigleCard extends React.Component<FormItemProp, FormSigleState > {
  input : FormItemProp;

  type = 'SigleCard';

  constructor(functionPass:FormItemProp) {
    super(functionPass);
    this.input = functionPass;
    this.state = {
      valueValid: false,
      sigle: functionPass.value,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidUpdate(prevProps :FormItemProp) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      if (value === '') {
        this.setState({ sigle: value, valueValid: false });
      }
    }
  }

  handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { value } = target;
    const isValid = value.length < 9 && value.length > 6;
    this.setState({ valueValid: isValid, sigle: value });
    this.input.inputCallback(this.type, isValid, value);
  }

  render() {
    const { valueValid, sigle } = this.state;
    const shouldAutoFocus = sigle.length > 0;
    const input = valueValid ? <InputHintOk autoFocus={shouldAutoFocus} value={sigle} placeholder="Titre" onChange={this.handleUserInput} /> : <InputHintNo autoFocus={shouldAutoFocus} value={sigle} placeholder="Titre" onChange={this.handleUserInput} />;
    const toolTip = !valueValid ? (
      <Tooltip label="Le sigle du cours contient entre 7 et 8 charactères" fontSize="md">
        <Icon name="question circle outline" />
      </Tooltip>
    ) : (null);

    return (
      <BoxCard>
        <Text fontSize="2xl" textAlign="left">Sigle</Text>
        <Text textAlign="left">Le sigle du cours. Ce champ sera utilisé pour faire la recherche de cours. Exemple: LOG1000 </Text>
        {input}
        {toolTip}
      </BoxCard>
    );
  }
}
