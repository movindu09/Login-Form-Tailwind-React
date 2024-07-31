package org.example.todo.service;

import org.example.todo.dto.TodoDto;
import org.example.todo.model.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoService {
    TodoDto createTodo(TodoDto todoDto);

    List<Todo> getAllTodos();

    Optional<Todo> getTodoById(Long id);

    Todo updateTodo(Todo todo);

    void deleteTodoById(Long id);
}
