import React, { useState } from 'react';

export const DragAndDrop = () => {
    const [tasks, setTasks] = useState([
        { 
            id: 1,
            title: 'Tarea 1',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            position: 1
        },
        { 
            id: 2,
            title: 'Tarea 2',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            position: 2
        },
        { 
            id: 3,
            title: 'Tarea 3',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            position: 3
        },
        { 
            id: 4,
            title: 'Tarea 4',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            position: 4
        },
        { 
            id: 5,
            title: 'Tarea 5',
            body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit ipsum dolor.',
            position: 5
        },
    ]);

    const startDrag = (evt, item) => {
        evt.dataTransfer.setData('itemID', item.id);
    }

    const draggingOver = (evt) => {
        evt.preventDefault();
    }

    const onDrop = (evt, position) => {
        evt.preventDefault();
        const itemID = evt.dataTransfer.getData('itemID');
        const draggedItem = tasks.find(item => item.id == itemID);
        
        const draggedPosition = draggedItem.position;

        draggedItem.position = position;

        const itemsToUpdate = tasks.filter(item => {
            return (position > draggedPosition) ?
                (item.position > draggedPosition && item.position <= position) :
                (item.position < draggedPosition && item.position >= position);
        });
        
        const updatedItems = itemsToUpdate.map(item => {
            return {
                ...item,
                position: (position > draggedPosition) ? item.position - 1 : item.position + 1
            };
        });

        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(item => {
                if (item.id === draggedItem.id) {
                    return draggedItem;
                }
                const updatedItem = updatedItems.find(updatedItem => updatedItem.id === item.id);
                return updatedItem ? updatedItem : item;
            });
            return updatedTasks;
        });
    }

    return (
        <>
            <h1>
                Arrastrar y Soltar  
                <img className='icon-react' src="src/assets/react.svg" alt="" />
            </h1>
            <br/>

            <div className='drag-and-drop'>
                <div className='column column--1'>
                    <h3>
                        Tareas por hacer
                    </h3>
                    <table className='dd-zone' droppable="true">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.sort((a, b) => a.position - b.position).map(item => (
                                <tr className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)} onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, item.position)}>
                                    <td><strong className='title'>{item.title}</strong></td>
                                    <td><p className='body'>{item.body}</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
