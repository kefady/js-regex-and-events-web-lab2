import React, {useEffect, useState} from 'react';
import classes from './Table.module.css';

const DEFAULT_COLOR = '#FFFFFF'

const Table = () => {
    const [size, setSize] = useState(6);
    const [colors, setColors] = useState(Array(size * size).fill(DEFAULT_COLOR));
    const [paletteColor, setPaletteColor] = useState('#000000');

    const [previousColor, setPreviousColor] = useState('');

    useEffect(() => {
        setColors(Array(size * size).fill('#FFFFFF'));
    }, [size]);

    const handleSizeChange = (e) => {
        setSize(Number(e.target.value));
    };

    const handlePaletteColorChange = (e) => {
        setPaletteColor(e.target.value);
    };

    const handleMouseEnter = (index) => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const newColors = [...colors];
        setPreviousColor(newColors[index])
        newColors[index] = randomColor;
        setColors(newColors);
    };

    const handleMouseLeave = (index) => {
        colors[index] = previousColor;
    }

    const handleClick = (index) => {
        const newColors = [...colors];
        newColors[index] = paletteColor;
        setPreviousColor(paletteColor)
        setColors(newColors);
    };

    const handleDoubleClick = (columnIndex) => {
        const newColors = [...colors];
        for (let i = columnIndex; i < newColors.length; i += size) {
            newColors[i] = paletteColor;
        }
        setColors(newColors);
    };

    const renderTable = () => {
        const table = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                row.push(
                    <td
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        onClick={() => handleClick(index)}
                        onDoubleClick={() => handleDoubleClick(j)}
                        style={{backgroundColor: colors[index]}}
                    >
                        {index + 1}
                    </td>
                );
            }
            table.push(<tr key={i}>{row}</tr>);
        }
        return table;
    };

    return (
        <div className={classes.container}>
            <div className={classes.inputContainer}>
                <div className={classes.inputBox}>
                    <label htmlFor="size">Оберіть розмір</label>
                    <input
                        type="number"
                        name="size"
                        id="size"
                        min="2"
                        max="10"
                        value={size}
                        placeholder="Розмір матриці"
                        onChange={(event) => handleSizeChange(event)}
                    />
                </div>
                <div className={classes.inputBox}>
                    <label htmlFor="color">Оберіть колір</label>
                    <input
                        type="color"
                        name="color"
                        id="color"
                        value={paletteColor}
                        onChange={(event) => handlePaletteColorChange(event)}
                    />
                </div>
            </div>
            <table className={classes.table}>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>
    );
};

export default Table;
