/* eslint-disable import/extensions */
import {
  Text, Image, Input, Box, ChakraProvider,
  Popover, HStack, PopoverTrigger, Button, PopoverContent, PopoverArrow,
  PopoverCloseButton, PopoverHeader, PopoverBody, Center, SimpleGrid,
  extendTheme, Heading,
} from '@chakra-ui/react';
import React, { ChangeEvent, RefObject } from 'react';
import {
  ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import BoxCard from '../../styles/boxCard';
import { InputHintOk } from '../../styles/InputHint';
import { FormItemProp } from './TitleComponent';
import { storageEmulator } from '../../pages/global';

export interface FormItemState {
  valueValid: boolean,
}

interface FormImageState {
  uri: string,
  file : File | null,
  textColor : string,
  baseColor: string
  text: string,
  canvasKey : number,
}

export class FormImageCard extends React.Component<FormItemProp, FormImageState > {
  colors = [
    '#718096',
    '#E53E3E',
    '#2D3748',
    '#38A169',
    '#3182CE',
    '#2A4365',
    '#D69E2E',
    '#DD6B20',
    '#805AD5',
    '#D53F8C',
  ];

  theme = extendTheme({
    components: {
      Popover: {
        variants: {
          picker: {
            popper: {
              maxWidth: 'unset',
              width: 'unset',
            },
          },
        },
      },
    },
  });

  canvasA: RefObject<HTMLCanvasElement>;

  constructor(functionPass:FormItemProp) {
    super(functionPass);
    this.state = {
      canvasKey: 0,
      file: null,
      text: 'Sigle',
      uri: functionPass.value,
      textColor: '#2D3748',
      baseColor: '#09f',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.canvasA = React.createRef();
  }

  componentDidMount(): void {
    this.updateImage();
  }

  handleDeleteFile() {
    const { canvasKey } = this.state;
    this.setState({ uri: '', file: null, canvasKey: canvasKey + 1 }, () => { this.updateImage(); });
  }

  onHandleTextColorChange(c: string) {
    const { canvasKey } = this.state;
    this.setState({ textColor: c, canvasKey: canvasKey + 1 }, () => { this.updateImage(); });
  }

  onHandleInput(e: ChangeEvent<HTMLInputElement>) {
    const { canvasKey } = this.state;
    this.setState({
      text: e.target.value,
      canvasKey: canvasKey + 1,
    }, () => { this.updateImage(); });
  }

  handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const { canvasKey } = this.state;
      const file = e.target.files[0];
      this.setState({ uri: URL.createObjectURL(file), file, canvasKey: canvasKey + 1 });
    }
  };

  onHandleColorChange(c: string) {
    const { canvasKey } = this.state;
    this.setState({ baseColor: c, canvasKey: canvasKey + 1 }, () => { this.updateImage(); });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods, consistent-return
  saveImageToFirebase() {
    return new Promise((resolve) => {
      const { file } = this.state;
      if (file === null) {
        const canvasBase = this.canvasA?.current;
        if (canvasBase !== null) {
          canvasBase.toBlob((blob) => {
            if (blob !== null) {
              const newId = `${uuidv4()}${'generated.png'}`;
              const storageRef = ref(storageEmulator, newId);
              const uploadTask = uploadBytesResumable(storageRef, blob);
              // eslint-disable-next-line max-len
              uploadTask.then(() => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  resolve(url);
                });
              });
            }
          });
        }
      } else {
        const newId = `${uuidv4()}${file?.name}`;
        const storageRef = ref(storageEmulator, newId);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.then(() => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        });
      }
    });
  }

  updateImage() {
    const {
      baseColor, textColor, text,
    } = this.state;

    if (this.canvasA !== null && this.canvasA !== undefined) {
      const context = this.canvasA.current?.getContext('2d');
      const style = {
        fontSize: 175, fontFamily: 'Arial', color: textColor, textAlign: 'left', textBaseline: 'top',
      };
      const image = new window.Image();
      image.src = 'https://firebasestorage.googleapis.com/v0/b/gapris-6b7d5.appspot.com/o/Base.png?alt=media&token=d3d94f16-0e0d-4612-b4bc-e38f89e52c36';
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        if (this.canvasA.current !== null && context !== undefined && context !== null) {
          context.drawImage(image, 0, 0, this.canvasA.current.width, this.canvasA.current.height);
          context.globalCompositeOperation = 'source-in';

          // draw color
          context.fillStyle = baseColor;
          context.fillRect(0, 0, this.canvasA?.current.width, this.canvasA?.current.height);
          context.globalCompositeOperation = 'source-over';
          context.beginPath();
          context.font = `${style.fontSize}px ${style.fontFamily}`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillStyle = style.color;
          context.fillText(text, 400, 400);
          // context.strokeText(text, 400, 400);
        }
      };
    }
  }

  render() {
    const {
      uri, baseColor, textColor, text, file, canvasKey,
    } = this.state;
    const input = file === null ? <InputHintOk type="file" onChange={this.handleUserInput} /> : (
      <HStack width="100%">
        <InputHintOk type="file" onChange={this.handleUserInput} />
        <Button onClick={() => { this.handleDeleteFile(); }}> Supprimer </Button>
      </HStack>
    );

    return (
      <BoxCard>
        <Text fontSize="2xl" textAlign="left">Image du cours</Text>
        <Text textAlign="left">L&apos;image du cours sera visible par les étudiants.</Text>
        <HStack width="100%">
          <Text fontSize="lg" width="95%">Utiliser l&apos;image générée ci-dessous, ou utiliser un fichier: </Text>
          {input}
          <Box width="1%" />
        </HStack>

        {file === null
          ? (
            <HStack>
              <Box height={500} width={800}>
                <canvas key={canvasKey} id="canvas1" ref={this.canvasA} width="800" height="500" style={{ position: 'absolute' }} />
              </Box>

              <Box>
                <HStack>
                  <Heading fontSize="lg">Text: </Heading>
                  <Input
                    onChange={(e:ChangeEvent<HTMLInputElement>) => { this.onHandleInput(e); }}
                    value={text}
                  />
                </HStack>
                <ChakraProvider theme={this.theme}>
                  <HStack>
                    <Heading fontSize="lg">Couleur de l&apos;image: </Heading>
                    <Popover variant="picker">
                      <PopoverTrigger>
                        <Button
                          aria-label={baseColor}
                          background={baseColor}
                          height="22px"
                          width="22px"
                          padding={0}
                          minWidth="unset"
                          borderRadius={3}
                        />
                      </PopoverTrigger>
                      <PopoverContent width="170px">
                        <PopoverArrow bg={baseColor} />
                        <PopoverCloseButton color="white" />
                        <PopoverHeader
                          height="100px"
                          backgroundColor={baseColor}
                          borderTopLeftRadius={5}
                          borderTopRightRadius={5}
                          color="white"
                        >
                          <Center height="100%">{baseColor}</Center>
                        </PopoverHeader>
                        <PopoverBody height="120px">
                          <SimpleGrid columns={5} spacing={2}>
                            {this.colors.map((c) => (
                              <Button
                                key={c}
                                aria-label={c}
                                background={c}
                                height="22px"
                                width="22px"
                                padding={0}
                                minWidth="unset"
                                borderRadius={3}
                                _hover={{ background: c }}
                                onClick={() => { this.onHandleColorChange(c); }}
                              />
                            ))}
                          </SimpleGrid>
                          <Input
                            borderRadius={3}
                            marginTop={3}
                            placeholder="red.100"
                            size="sm"
                            value={baseColor}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              this.onHandleColorChange(e.target.value);
                            }}
                          />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </ChakraProvider>

                <ChakraProvider theme={this.theme}>
                  <HStack>
                    <Heading fontSize="lg">Couleur du texte: </Heading>
                    <Popover variant="picker">
                      <PopoverTrigger>
                        <Button
                          aria-label={textColor}
                          background={textColor}
                          height="22px"
                          width="22px"
                          padding={0}
                          minWidth="unset"
                          borderRadius={3}
                        />
                      </PopoverTrigger>
                      <PopoverContent width="170px">
                        <PopoverArrow bg={textColor} />
                        <PopoverCloseButton color="white" />
                        <PopoverHeader
                          height="100px"
                          backgroundColor={textColor}
                          borderTopLeftRadius={5}
                          borderTopRightRadius={5}
                          color="white"
                        >
                          <Center height="100%">{textColor}</Center>
                        </PopoverHeader>
                        <PopoverBody height="120px">
                          <SimpleGrid columns={5} spacing={2}>
                            {this.colors.map((c) => (
                              <Button
                                key={c}
                                aria-label={c}
                                background={c}
                                height="22px"
                                width="22px"
                                padding={0}
                                minWidth="unset"
                                borderRadius={3}
                                _hover={{ background: c }}
                                onClick={() => { this.onHandleTextColorChange(c); }}
                              />
                            ))}
                          </SimpleGrid>
                          <Input
                            borderRadius={3}
                            marginTop={3}
                            placeholder="red.100"
                            size="sm"
                            value={baseColor}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              this.onHandleTextColorChange(e.target.value);
                            }}
                          />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </ChakraProvider>
              </Box>
            </HStack>
          )
          : <Image maxHeight="500" maxWidth="800" src={uri} /> }
      </BoxCard>
    );
  }
}
