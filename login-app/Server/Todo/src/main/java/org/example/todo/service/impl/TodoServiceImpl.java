package org.example.todo.service.impl;

import lombok.AllArgsConstructor;
import org.example.todo.dto.TodoDto;
import org.example.todo.exception.ResourceNotFoundException;
import org.example.todo.model.Todo;
import org.example.todo.repository.TodoRepository;
import org.example.todo.service.TodoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private ModelMapper modelMapper;

    @Override
    public TodoDto createTodo(TodoDto todoDto) {
        // Convert DTO to entity
        Todo todo = modelMapper.map(todoDto, Todo.class);

        // Save the entity
        Todo savedTodo = todoRepository.save(todo);

        // Convert the saved entity back to DTO
        return modelMapper.map(savedTodo, TodoDto.class);
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    @Override
    public Todo updateTodo(Todo todo) {
        if (!todoRepository.existsById(todo.getId())) {
            throw new ResourceNotFoundException("Todo not found with the id " + todo.getId());
        }
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodoById(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Todo not found with id " + id);
        }
        todoRepository.deleteTodoById(id);
    }

}