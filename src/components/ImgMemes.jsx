import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import TextSettings from './TextSettings';
import './ImgMemes.css';

const ImgMemes = () => {
    const [selectedMeme, setselectedMeme] = useState(null);
    const [memesArray, setMemesArray] = useState([]);
    const [textSettings, setTextSettings] = useState([
        {
            isUppercase: true,
            isBold: false,
            isTextShadow: true,
            isItalic: false,
            textColor: '#ffa500',
            fontSize: 40,
            boxSize: 300,
            horizontalPosition: 0,
            verticalPosition: 0,
        },
    ]);
    const [showSettings, setShowSettings] = useState(Array(textSettings.length).fill(false));

    const handleSelect = (meme) => {
        setselectedMeme(meme);
    };

    const handleShowSettings = (index) => {
        setShowSettings((prevShowSettings) => {
            const updatedShowSettings = [...prevShowSettings];
            updatedShowSettings[index] = !updatedShowSettings[index];
            return updatedShowSettings;
        });
    };

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then((api) =>
                api.json().then((response) => setMemesArray(response.data.memes))
            );
        if (selectedMeme) {
            addTextSettings(selectedMeme.box_count);
        }
    }, [selectedMeme]);

    const addTextSettings = (count) => {
        const newSettings = Array.from({ length: count }, () => ({
            isUppercase: true,
            isBold: false,
            isTextShadow: true,
            isItalic: false,
            textColor: '#ffa500',
            fontSize: 40,
            boxSize: 300,
            horizontalPosition: 0,
            verticalPosition: 0,
        }));
        setTextSettings(newSettings);
    };

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
        <div className='bg-primary bg-gradient min-vh-100'>
            <h1 className='mb-3 py-2 text-light text-center text-shadow text-uppercase'>Editor de memes</h1>

            <div className='row m-0'>
                <div className='col col-md-6 d-flex justify-content-center p-3'>
                    <figure className='figure position-relative' id='export'>
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
                                    width: settings.boxSize,
                                    left: `${settings.horizontalPosition}%`, 
                                    top: `${settings.verticalPosition}%`, 
                                }}
                            >
                                {settings.textMeme}
                            </span>
                        ))}
                        {selectedMeme !== null ? (
                            <img className='' src={selectedMeme.url} alt='meme' />
                        ) : null}
                    </figure>
                </div>

                <div className='col col-md-6'>
                    <h4 className='text-light text-shadow'>Elegí tu imagen favorita</h4>
                    <div className='imgbox d-flex overflow-x-scroll p-1 bg-light rounded mb-3' id='imgBox'>
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

                    <h4 className='text-light text-shadow'>Ingrese el texto del meme</h4>
                    {textSettings.map((settings, index) => (
                        <div key={index} className='input-group text-input rounded-start mb-1'>
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
                                <button className='btn bg-light' onClick={() => handleShowSettings(index)}>
                                    <i className="bi bi-gear-fill"></i>
                                </button>

                            </span>
                            <div className='w-100' id='textSettings'>
                                {showSettings[index] ? (
                                    <div>
                                        <TextSettings
                                            isUppercase={settings.isUppercase}
                                            isBold={settings.isBold}
                                            isTextShadow={settings.isTextShadow}
                                            isItalic={settings.isItalic}
                                            fontSize={settings.fontSize}
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
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='py-4'>
                <button onClick={downloadMeme} type='button' className='d-block mx-auto btn btn-lg btn-light bg-gradient border border-3 border-dark'>Descargar</button>
            </div>
        </div>
    );
};

export default ImgMemes;