import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './AddDoPage.module.css';

function AddDoPage() {
    const schema = yup.object().shape({
        todo: yup.string()
            .required('Это поле не должно быть пустым'),
        details: yup.string(),
        date: yup.date('Неправильный формат даты').transform(transformDate).min(new Date(), 'Срок должен быть позже чем сегодня').max(new Date('9999-12-31'), 'Слишком далекое планирование...').nullable(),
    });

    function transformDate(value, originalValue) {
        const transformedDate = new Date(originalValue);
        transformedDate.setHours(23);
        transformedDate.setMinutes(59);
        transformedDate.setSeconds(59);
        transformedDate.setMilliseconds(999);
        return originalValue ? transformedDate : null;
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/todo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todo: data.todo,
                    details: data.details,
                    deadline: data.date,
                }),
            });
            if (!response.ok) alert('HTTP error: ' + response.status);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <h1>Добавьте дело</h1>
            <form className={styles.form_block} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>Что сделать:</label>
                <input type='text' {...register('todo')} className={`${styles.input} ${errors.todo && styles.error}`} autoFocus />
                {errors.todo && <p className={styles.error_p}>{errors.todo.message}</p>}
                <label className={styles.label}>Детали:</label>
                <input type='text' {...register('details')} className={styles.input} />
                <label className={styles.label}>Срок выполнения:</label>
                <input type='date' {...register('date')} className={`${styles.input} ${errors.date && styles.error}`} />
                {errors.date && <p className={styles.error_p}>{errors.date.message}</p>}
                <button className={styles.button} type='submit'>добавить</button>
            </form>
        </>
    );
}

export default AddDoPage;
