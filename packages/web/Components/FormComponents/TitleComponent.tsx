import { Icon, Text, Tooltip } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import BoxCard from '../../styles/boxCard';

import { InputHintOk, InputHintNo } from '../../styles/InputHint';

export interface FormItemProp {
    // This prop type is used throuout the project
    // eslint-disable-next-line react/no-unused-prop-types
    inputCallback: (type : string, isValid: boolean, data: string) => void,
    // eslint-disable-next-line react/no-unused-prop-types
    value: string,
}

export interface FormItemState {
  valueValid: boolean,
}

interface FormTitleState extends FormItemState {
  title: string,
}

export class FormTitleCard extends React.Component<FormItemProp, FormTitleState > {
  input : FormItemProp;

  type = 'TitleCard';

  constructor(functionPass:FormItemProp) {
    super(functionPass);
    this.input = functionPass;
    this.state = {
      valueValid: false,
      title: functionPass.value,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidUpdate(prevProps :FormItemProp) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      if (value === '') {
        this.setState({ title: value, valueValid: false });
      }
    }
  }

  handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { value } = target;
    const isValid = value.length > 4 && value.length <= 100;
    this.setState({ valueValid: isValid, title: value });
    this.input.inputCallback(this.type, isValid, value);
  }

  render() {
    const { valueValid, title } = this.state;
    const shouldAutoFocus = title.length > 0;
    const input = valueValid ? <InputHintOk autoFocus={shouldAutoFocus} value={title} placeholder="Titre" onChange={this.handleUserInput} /> : <InputHintNo autoFocus={shouldAutoFocus} value={title} placeholder="Titre" onChange={this.handleUserInput} />;
    const toolTip = !valueValid ? (
      <Tooltip label="Le titre du cours doit contenir au moins 5 charactères. Maximum 100 charactères" fontSize="md">
        <Icon name="question circle outline" />
      </Tooltip>
    ) : (null);
    return (
      <BoxCard>
        <Text fontSize="2xl" textAlign="left">Titre</Text>
        <Text textAlign="left">Le titre du cours. Ce champ sera utilisé pour faire la recherche de cours. Exemple: Introduction au génie logiciel</Text>
        {input}
        {toolTip}
      </BoxCard>
    );
  }
}
