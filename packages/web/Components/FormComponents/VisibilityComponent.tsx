import {
  FormControl, FormLabel, Icon, Switch, Text, Tooltip,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import BoxCard from '../../styles/boxCard';
import { InputHintOk, InputHintNo } from '../../styles/InputHint';
import { FormItemProp, FormItemState } from './TitleComponent';

interface FormVisibilityState extends FormItemState {
  currentText: string,
  inputEnabled: boolean,
}

class FormVisibilityCard extends React.Component<FormItemProp, FormVisibilityState > {
  input : FormItemProp;

  type = 'VisibilityCard';

  constructor(functionPass:FormItemProp) {
    super(functionPass);
    this.input = functionPass;
    this.state = {
      valueValid: true,
      inputEnabled: false,
      currentText: functionPass.value,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  componentDidUpdate(prevProps :FormItemProp) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      if (value === '') {
        this.setState({ currentText: value, inputEnabled: false });
      }
    }
  }

  handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { value } = target;
    const isValid = value.length > 8;
    this.setState({ valueValid: isValid, currentText: value });
    this.input.inputCallback(this.type, isValid, value);
  }

  handleVisibleChange(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { checked } = target;
    this.setState({ valueValid: !checked, currentText: '', inputEnabled: checked });
    this.input.inputCallback(this.type, !checked, '');
  }

  render() {
    const { valueValid, inputEnabled, currentText } = this.state;
    const input = valueValid ? (
      <InputHintOk
        autoFocus={inputEnabled}
        value={currentText}
        placeholder="Code d'acces au cours"
        onChange={this.handleUserInput}
        disabled={!inputEnabled}
      />
    ) : (
      <InputHintNo
        autoFocus={inputEnabled}
        value={currentText}
        placeholder="Code d'acces au cours"
        onChange={this.handleUserInput}
        disabled={!inputEnabled}
      />
    );
    const toolTip = !valueValid ? (
      <Tooltip label="Le mot de passe doit contenir au moins 8 charactères." fontSize="md">
        <Icon name="question circle outline" />
      </Tooltip>
    ) : (null);

    return (
      <BoxCard>
        <Text fontSize="2xl" textAlign="left">Visibilité</Text>
        <Text textAlign="left">En marquant le cours comme privé, il est possible d’ajouter un mot de passe pour bloquer l’accès du cours. Il est possible de changer ce paramètre plus tard. (Optionnel)</Text>
        <FormControl display="flex" alignItems="center" p="5">
          <FormLabel mb="0">
            Privé
          </FormLabel>
          <Switch onChange={this.handleVisibleChange} isChecked={inputEnabled} colorScheme="blue" />
        </FormControl>
        {input}
        {toolTip}
      </BoxCard>
    );
  }
}

export default FormVisibilityCard;
