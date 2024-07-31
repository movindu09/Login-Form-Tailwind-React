package org.example.todo.repository;

import org.example.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository  extends JpaRepository<Todo,Long> {
    void deleteTodoById(Long id);
}
