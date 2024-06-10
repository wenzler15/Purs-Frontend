import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const makeCreateResearchValidation = () => {
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Campo obrigatório'),
        description: Yup.string().required('Campo obrigatório')
    });
    return { resolver: yupResolver(validationSchema) };
};
