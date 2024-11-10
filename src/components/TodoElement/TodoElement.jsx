import styles from './TodoElement.module.css';

const TodoElement = ({ id, todo, details, date }) => {
    const deleteDo = async () => {
        try {
            const response = await fetch('http://localhost:3000/todo/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null,
            });
            if (!response.ok) alert('HTTP error: ' + response.status);
        } catch (error) {
            alert(error);
        }
        window.location.reload();
    }

    const d = date ? new Date(date) : null;

    return (
        <div className={styles.container}>
            <div className={styles.text_div}>
                <p className={styles.p_todo}>{todo}</p>
                <p className={styles.p_deadline}>{date ? `до ${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}.${d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}.${d.getFullYear()}` : null}</p>
                {details && <article className={styles.article}>{details}</article>}
            </div>
            <div className={styles.deleteBlock} onClick={deleteDo} />
        </div>
    );
}

export default TodoElement;
