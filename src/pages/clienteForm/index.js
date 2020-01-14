import React from 'react';
import * as Yup from 'yup';
import tipoTelefoneApi from '../../services/tipoTelefone';
import clienteApi from '../../services/cliente';

import './styles.css';
import { withFormik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import Header from '../../components/header';
import { Link, useHistory } from 'react-router-dom';
import { viaCepApi } from '../../services/viaCepApi';


const schema = Yup.object().shape({
    nome: Yup.string()
        .required('Campo obrigatório')
        .min(3)
        .max(100),
    cpf: Yup.string()
        .required('Campo obrigatório')
        .min(11, 'Campo obrigatório')
        .max(11, 'Campo obrigatório'),
    cep: Yup.string()
        .required('Campo obrigatório')
        .min(8, 'Campo obrigatório')
        .max(8, 'Campo obrigatório'),
    logradouro: Yup.string()
        .required('Campo obrigatório'),
    bairro: Yup.string()
        .required('Campo obrigatório'),
    cidade: Yup.string()
        .required('Campo obrigatório'),
    uf: Yup.string()
        .required('Campo obrigatório')
        .min(2)
        .max(2),
    complemento: Yup.string(),
    telefone: Yup.array().of(
        Yup.object().shape({
            numero: Yup.string().required('Campo obrigatório')
        })
    ).min(1, 'Necessário pelo menos um telefone!'),
    email: Yup.array().of(
        Yup.object().shape({
            nome: Yup.string().email('Email inválido!').required('Campo obrigatório')
        })
    ).min(1, 'Necessário pelo menos um email!')
});

const handleSubmit = async (values) => {

    try {
        await clienteApi.criar(values);
        alert('Cliente cadastrado com sucesso!');
    } catch (e) {
        alert('Erro ao cadastrar cliente!');
    }
}

const handleBlurCep = async (event, { setFieldValues, ...props }) => {
    const cep = event.target.value;
    console.log(props);

    try {
        const {
            logradouro,
            complemento,
            bairro,
            localidade: cidade,
            uf
        } = await viaCepApi.consultarCep(cep);

        setFieldValues('logradouro', logradouro);
        setFieldValues('complemento', complemento);
        setFieldValues('bairro', bairro);
        setFieldValues('cidade', cidade);
        setFieldValues('uf', uf);
    } catch (e) { }
}

const enhanceWithFormik = withFormik({
    mapPropsToValues: () => ({
        nome: '',
        cpf: '',
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: '',
        telefone: [{ numero: '', tipoTelefone: { id: 1 } }],
        email: [{ nome: '' }]
    }),
    handleSubmit: handleSubmit,
    validateOnChange: true,
    validationSchema: schema
})

const form = props => {

    return (
        <div className="cliente-container">

            <Form>
                <div className="field">
                    <Field name="nome" placeholder="Nome" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="nome" />
                </div>

                <div className="field">
                    <Field name="cpf" placeholder="CPF" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="cpf" />
                </div>

                <div className="field">
                    <Field name="cep" onBlur={e => handleBlurCep(e, props)} placeholder="CEP" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="cep" />
                </div>

                <div className="field">
                    <Field name="logradouro" placeholder="Logradouro" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="logradouro" />
                </div>

                <div className="field">
                    <Field name="bairro" placeholder="Bairro" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="bairro" />
                </div>

                <div className="field">
                    <Field name="cidade" placeholder="Cidade" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="cidade" />
                </div>

                <div className="field">
                    <Field name="uf" placeholder="UF" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="uf" />
                </div>

                <div className="field">
                    <Field name="complemento" placeholder="Complemento" />
                    <br />
                    <ErrorMessage className="field-error" component="span" name="complemento" />
                </div>

                <div className="field">
                    Telefones:
                    <FieldArray name="telefone" render={arrayHelpers => (
                        <div className="telefones">
                            {props.values.telefone.map((t, index) => (
                                <div className="telefone" key={index}>

                                    <div className="field">
                                        <Field name={`telefone[${index}].numero`} placeholder="Número do telefone" />
                                        <ErrorMessage className="field-error" component="span" name={`telefone[${index}].numero`} />
                                    </div>

                                    <Field as="select" name={`telefone[${index}].tipoTelefone`} placeholder="Tipo de Telefone">
                                        {props.tiposTelefone.map((tipoTelefone) => (
                                            <option key={tipoTelefone.id} value={tipoTelefone.id}>{tipoTelefone.nome}</option>
                                        ))}
                                    </Field>

                                    <button type="button" className="remover" onClick={() => index ? arrayHelpers.remove(index) : null}>-</button>

                                </div>
                            ))}

                            <div className="adicionar">
                                <button type="button" onClick={() => arrayHelpers.push({ numero: '', tipoTelefone: { id: 1 } })}>
                                    Adicionar telefone
                            </button>

                            </div>
                        </div>
                    )} />
                </div>

                <div className="emails">
                    Emails:
                    <FieldArray name="email" render={arrayHelpers => (
                        <div>
                            {props.values.email.map((e, index) => (
                                <div className="email" key={index}>

                                    <div className="field">
                                        <Field name={`email[${index}].nome`} placeholder="Email" />
                                        <ErrorMessage className="field-error" component="span" name={`email[${index}].nome`} />
                                    </div>

                                    <button type="button" className="remover" onClick={() => index ? arrayHelpers.remove(index) : null}>-</button>

                                </div>
                            ))}

                            <div className="adicionar">
                                <button type="button" onClick={() => arrayHelpers.push({ nome: '' })}>Adicionar email</button>
                            </div>
                        </div>
                    )} />
                </div>

                <div className="send">
                    <button type="submit">Enviar</button>
                </div>
            </Form>
        </div>
    )
}

const MyForm = enhanceWithFormik(form);

export default class ClienteForm extends React.Component {

    state = {
        tiposTelefone: [],
    }

    async componentDidMount() {

        const response = await tipoTelefoneApi.obterTodos();

        this.setState({ tiposTelefone: response.data });
    }

    render() {
        return (
            <div className="cliente-form">
                <Header />

                <div className="titulo">
                    <h2>Cadastro de cliente</h2>
                </div>

                <hr />

                <MyForm
                    tiposTelefone={this.state.tiposTelefone}
                    handleSubmit={handleSubmit}
                />

                <Link to="/clientes">Voltar</Link>
            </div>
        )
    }
}

