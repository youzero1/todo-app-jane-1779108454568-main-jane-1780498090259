import styles from './TodoPage.module.css';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import ThemeDropdown from '@/components/ThemeDropdown';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  const { themeName, setThemeName } = useTheme();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <CheckSquare size={32} color="var(--color-primary)" />
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, get things done.</p>
          <div className={styles.themeRow}>
            <ThemeDropdown themeName={themeName} onThemeChange={setThemeName} />
          </div>
        </header>

        <main className={styles.main}>
          <TodoInput onAdd={addTodo} onToggleAll={toggleAll} hasTodos={todos.length > 0} />
          {filteredTodos.length > 0 || todos.length > 0 ? (
            <>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
              <TodoFooter
                activeCount={activeCount}
                completedCount={completedCount}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
            </>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🎉</span>
              <p className={styles.emptyText}>No todos yet. Add one above!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
