import React from 'react';
import * as Yup from 'yup';
import clienteApi from '../../services/cliente';
import tipoTelefoneApi from '../../services/tipoTelefone';

import './styles.css';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import Header from '../../components/header';
import { Link } from 'react-router-dom';


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
    complemento: Yup.string()
});

const handleSubmit = (values) => {
    const cliente = {};

    console.log(values);
}

const enhanceWithFormik = withFormik({
    mapPropsToValues: () => ({ nome: '', cpf: '' }),
    handleSubmit: handleSubmit,
    validateOnChange: true,
    validationSchema: schema
})

const form = props => {

    return (
        <div className="cliente-container">

            <Form>
                <div>
                    <Field name="nome" placeholder="Nome" />
                    <br />
                    <ErrorMessage name="nome" />
                </div>

                <div>
                    <Field name="cpf" placeholder="CPF" />
                    <br />
                    <ErrorMessage name="cpf" />
                </div>

                <div>
                    <Field name="cep" placeholder="CEP" />
                    <br />
                    <ErrorMessage name="cep" />
                </div>

                <div>
                    <Field name="logradouro" placeholder="Logradouro" />
                    <br />
                    <ErrorMessage name="logradouro" />
                </div>

                <div>
                    <Field name="bairro" placeholder="Bairro" />
                    <br />
                    <ErrorMessage name="bairro" />
                </div>

                <div>
                    <Field name="cidade" placeholder="Cidade" />
                    <br />
                    <ErrorMessage name="cidade" />
                </div>

                <div>
                    <Field name="uf" placeholder="UF" />
                    <br />
                    <ErrorMessage name="uf" />
                </div>

                <div>
                    <Field name="complemento" placeholder="Complemento" />
                    <br />
                    <ErrorMessage name="complemento" />
                </div>

                <button type="submit">Enviar</button>
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

                <MyForm tiposTelefone={this.state.tiposTelefone} />

                <Link to="/clientes">Voltar</Link>
            </div>
        )
    }
}

