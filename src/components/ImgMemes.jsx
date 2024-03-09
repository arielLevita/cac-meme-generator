// Dado que se trabaja con una API queposee información bastante limitada, se proponen los siguientes cambios a futuro para mejorar la experiencia de usuario:
// - Cambiar los <span> que colocan las líneas de texto sobre la imagen por <div>s que permitan que los textos más largos se desplacen acorde al tamaño de la imagen.
// - Crear una API propia que, además de traer los valores de la API utilizada, traiga los valores predeterminados para cada línea de texto en función del meme, de forma que los usuarios sólo necesiten ingresar el texto para obtener el meme requerido.
// - Mejorar la estética y crear un modo oscuro.

import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import TextSettings from './TextSettings';
import './ImgMemes.css';

const ImgMemes = () => {

    // Guarda la información del array de memes traidos por la API.
    const [memesArray, setMemesArray] = useState([]);
    // Guardar la información del array seleccionado.
    const [selectedMeme, setselectedMeme] = useState(null);
    // Guarda los valores de las propiedades de los textos del array seleccionado.
    const [textSettings, setTextSettings] = useState([]);
    // Activa/desactiva la vista de edición de cada texto.
    const [showSettings, setShowSettings] = useState(Array(textSettings.length).fill(false));

    // Pasa la información del meme seleccionado a 'selectedMeme'.
    const handleSelect = (meme) => {
        setselectedMeme(meme);
    };

    // Modificada 'showSettings' en función de la línea de texto seleccionada.
    const handleShowSettings = (index) => {
        setShowSettings((prevShowSettings) => {
            const updatedShowSettings = [...prevShowSettings];
            updatedShowSettings[index] = !updatedShowSettings[index];
            return updatedShowSettings;
        });
    };

    // Toma la información de la API. Cuando se selecciona un meme, activa la cantidad de líneas de texto en función de la clave 'box_count'.
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then((api) =>
                api.json().then((response) => setMemesArray(response.data.memes))
            );
        if (selectedMeme) {
            addTextSettings(selectedMeme.box_count);
        }
    }, [selectedMeme]);

    // Inicia cada caja de texto cargada con valores por defecto.
    const addTextSettings = (count) => {
        const newSettings = Array.from({ length: count }, () => ({
            isUppercase: true,
            isBold: false,
            isTextShadow: true,
            isItalic: false,
            textColor: '#ffa500',
            fontSize: 40,
            fontFamily: 'Impact',
            boxSize: 300,
            horizontalPosition: 0,
            verticalPosition: 0,
            rotation: 50,
        }));
        setTextSettings(newSettings);
    };

    // Permite el scroll horizontal para navegar entre las imágenes a elegir.
    useEffect(() => {
        const horizontalScrollDiv = document.getElementById('imgBox');

        const handleHorizontalScroll = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                horizontalScrollDiv.scrollLeft += e.deltaY;
            }
        };

        if (horizontalScrollDiv) {
            horizontalScrollDiv.addEventListener('wheel', handleHorizontalScroll);
        }

        return () => {
            if (horizontalScrollDiv) {
                horizontalScrollDiv.removeEventListener('wheel', handleHorizontalScroll);
            }
        };
    }, []);

    // Permite la descarga del meme generado en función del tamaño de la figura.
    const downloadMeme = () => {
        const downloadFigure = document.getElementById('export');
        html2canvas(downloadFigure, {
            allowTaint: true,
            useCORS: true,
            logging: true,
        }).then((canvas) => {
            const img = canvas.toDataURL('image/jpg', 1.0);
            const link = document.createElement('a');
            link.download = 'memepropio.jpg';
            link.href = img;
            link.click();
        });
    };

    return (
        <div className='min-vh-100'>
            <div className="wrapper">
                <h1 className='mb-3 py-2 text-light text-center text-shadow text-uppercase' style={{ fontFamily: 'Segoe UI', fontSize: 'clamp(2rem, 1.2125rem + 2.55vw, 3rem)' }}>Editor de memes</h1>

                <div className='row m-0'>
                    <div className='col col-md-6 d-flex justify-content-center p-3'>
                        {/* Meme a generar */}
                        <figure className='figure position-relative' id='export'>
                            {/* Creación de nuevos array en función de la cantidad de líneas de texto y la informcaión predeterminada de cada una. */}
                            {textSettings.map((settings, index) => (
                                <span
                                    key={index}
                                    className={`position-absolute text-center text-break lh-1
                                ${settings.isUppercase ? 'text-uppercase' : ''}
                                ${settings.isBold ? 'fw-bold' : ''}
                                ${settings.isTextShadow ? 'text-shadow' : ''}
                                ${settings.isItalic ? 'fst-italic' : ''}`}
                                    style={{
                                        color: settings.textColor,
                                        fontSize: settings.fontSize,
                                        fontFamily: settings.fontFamily,
                                        maxWidth: settings.boxSize,
                                        left: `${settings.horizontalPosition}%`,
                                        top: `${settings.verticalPosition}%`,
                                        transform: `rotate(${settings.rotation - 50}deg)`,
                                    }}
                                >
                                    {settings.textMeme}
                                </span>
                            ))}
                            {/* Si el usuario ha seleccionado una imagen, colocarla en la figura y configurar el tamaño de la misma en función de la imagen seleccionada para la correcta descarga del meme. Si aún no se ha seleccionado una imagen, mostrar un cuadro que solicite seleccionar para comenzar. */}
                            {selectedMeme ? (
                                <img src={selectedMeme.url} alt={selectedMeme.name} />
                            ) : (
                                <div className='d-flex justify-content-center align-items-center w-100 p-5'>
                                    <p className='fs-2 w-75 text-center text-light fw-semibold text-shadow'>Seleccione una imagen para comenzar <span className='mx-2'><i class="bi bi-hand-index"></i></span></p>
                                </div>
                            )}
                        </figure>
                    </div>

                    <div className='col col-md-6'>
                        <div className='bg-white px-2 pt-1 rounded-3'>
                            <h4 className='text-dark-emphasis'>Elegí tu imagen favorita</h4>
                            <div className='imgbox d-flex overflow-x-scroll p-1 bg-light rounded mb-3' id='imgBox'>
                                {/* Caja para seleccionar el meme a utilizar en función de su imagen. */}
                                {memesArray?.map((meme) => (
                                    <img
                                        key={meme.id}
                                        src={meme.url}
                                        name={meme.name}
                                        alt={meme.name}
                                        style={{ height: 100, marginRight: 10, border: '1px solid gray' }}
                                        onClick={() => handleSelect(meme)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='bg-white p-2 rounded-3'>
                            <h4 className='text-dark-emphasis'>Ingresá el texto del meme</h4>
                            {textSettings.map((settings, index) => (
                                <div key={index} className='input-group text-input rounded-start mb-1'>
                                    {/* Input para texto. */}
                                    <input
                                        className='form-control w-50 d-block'
                                        type='text'
                                        placeholder='Ingresar texto'
                                        name='meme'
                                        aria-label=''
                                        value={settings.textMeme || ''}
                                        onChange={(e) => {
                                            setTextSettings((prevSettings) => {
                                                const updatedSettings = [...prevSettings];
                                                updatedSettings[index] = { ...settings };
                                                updatedSettings[index].textMeme = e.target.value;
                                                return updatedSettings;
                                            });
                                        }}
                                    />
                                    {/* Input para color del texto. */}
                                    <span className='input-group-text'>
                                        <input
                                            type="color"
                                            className="form-control form-control-color"
                                            id="exampleColorInput"
                                            value={settings.textColor}
                                            title="Choose your color"
                                            onChange={(e) => {
                                                setTextSettings((prevSettings) => {
                                                    const updatedSettings = [...prevSettings];
                                                    updatedSettings[index] = { ...settings };
                                                    updatedSettings[index].textColor = e.target.value;
                                                    return updatedSettings;
                                                });
                                            }}
                                        />
                                    </span>
                                    <span className='input-group-text rounded-end'>
                                        {/* Botón para desplegar ajustes del texto. */}
                                        <button className='btn bg-light' onClick={() => handleShowSettings(index)}>
                                            <i class="bi bi-pencil-square"></i>
                                        </button>

                                    </span>
                                    <div className='w-100' id='textSettings'>
                                        {/* Cada caja intercambia información con el componente 'TextSettings', pasando los parámetros iniciales y los métodos de actualización de los valores. */}
                                        {showSettings[index] ? (
                                            <div>
                                                <TextSettings
                                                    isUppercase={settings.isUppercase}
                                                    isBold={settings.isBold}
                                                    isTextShadow={settings.isTextShadow}
                                                    isItalic={settings.isItalic}
                                                    fontSize={settings.fontSize}
                                                    fontFamily={settings.fontFamily}
                                                    boxSize={settings.boxSize}
                                                    setIsUppercase={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].isUppercase = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setIsBold={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].isBold = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setIsTextShadow={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].isTextShadow = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setIsItalic={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].isItalic = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setFontSize={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].fontSize = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setFontFamily={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].fontFamily = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setBoxSize={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].boxSize = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setHorizontalPosition={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].horizontalPosition = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setVerticalPosition={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].verticalPosition = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                    setRotation={(value) => {
                                                        setTextSettings((prevSettings) => {
                                                            const updatedSettings = [...prevSettings];
                                                            updatedSettings[index].rotation = value;
                                                            return updatedSettings;
                                                        });
                                                    }}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='py-4'>
                    {/* Botón de descarga del meme que captura la figura y la guarda como archivo .jpg */}
                    <button onClick={downloadMeme} type='button' className='d-block mx-auto btn btn-lg btn-secondary bg-gradient shadow-lg'>Descargar</button>
                </div>
            </div>
        </div>
    );
};

export default ImgMemes;