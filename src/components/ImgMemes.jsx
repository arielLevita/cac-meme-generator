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
        }));
        setTextSettings(newSettings);
    };

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
        <div className=''>
            <h1 className='my-3 text-center'>Editor de memes</h1>

            <div className='row m-0'>
                <div className='col col-md-6 d-flex justify-content-center p-3'>
                    <figure className='figure position-relative' id='export'>
                        {textSettings.map((settings, index) => (
                            <span
                                key={index}
                                className={`position-absolute text-break
                                ${settings.isUppercase ? 'text-uppercase' : ''}
                                ${settings.isBold ? 'fw-bold' : ''}
                                ${settings.isTextShadow ? 'text-shadow' : ''}
                                ${settings.isItalic ? 'fst-italic' : ''}`}
                                style={{ color: settings.textColor, fontSize: settings.fontSize }}
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
                    <h4>Elegí tu imagen favorita</h4>
                    <div className='imgbox d-flex overflow-x-scroll p-1 border border-secondary rounded mb-1'>
                        {memesArray?.map((meme) => (
                            <img
                                key={meme.id}
                                src={meme.url}
                                name={meme.name}
                                alt={meme.name}
                                style={{ height: 100, marginRight: 5 }}
                                onClick={() => handleSelect(meme)}
                            />
                        ))}
                    </div>

                    <h4>Ingrese el texto del meme</h4>
                    {textSettings.map((settings, index) => (
                        <div key={index} className='input-group text-input border border-secondary rounded mb-1'>
                            <input
                                className='form-control w-50 d-block'
                                type='text'
                                placeholder='poné tu frase'
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
                            <span className='input-group-text'>
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
                                            setIsUppercase={(value) => {
                                                // Update the value in textSettings
                                                setTextSettings((prevSettings) => {
                                                    const updatedSettings = [...prevSettings];
                                                    updatedSettings[index].isUppercase = value;
                                                    return updatedSettings;
                                                });
                                            }}
                                            setIsBold={(value) => {
                                                // Update the value in textSettings
                                                setTextSettings((prevSettings) => {
                                                    const updatedSettings = [...prevSettings];
                                                    updatedSettings[index].isBold = value;
                                                    return updatedSettings;
                                                });
                                            }}
                                            setIsTextShadow={(value) => {
                                                // Update the value in textSettings
                                                setTextSettings((prevSettings) => {
                                                    const updatedSettings = [...prevSettings];
                                                    updatedSettings[index].isTextShadow = value;
                                                    return updatedSettings;
                                                });
                                            }}
                                            setIsItalic={(value) => {
                                                // Update the value in textSettings
                                                setTextSettings((prevSettings) => {
                                                    const updatedSettings = [...prevSettings];
                                                    updatedSettings[index].isItalic = value;
                                                    return updatedSettings;
                                                });
                                            }}
                                            setFontSize={(value) => {
                                                // Update the fontSize in textSettings
                                                setTextSettings((prevSettings) => {
                                                    const updatedSettings = [...prevSettings];
                                                    updatedSettings[index].fontSize = value;
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
            <button onClick={downloadMeme} type='button' className='d-block mx-auto mt-3 btn btn-primary'>Decargar</button>
        </div>
    );
};

export default ImgMemes;