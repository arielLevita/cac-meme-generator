import html2canvas from 'html2canvas';
import React, { useState, useEffect } from 'react';

const ImgMemes = () => {

    const [imgMeme, setImgMeme] = useState(null);
    const [textMeme, setTextMeme] = useState('');
    const [memesArray, setMemesArray] = useState([]);

    const handleText = (e) => {
        setTextMeme(e.target.value);
    }

    const handleSelect = (e) => {
        setImgMeme(e.target.src)
    }
    console.log(imgMeme)

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(api => api.json()
                .then(response => setMemesArray(response.data.memes))
            )
    }, []);

    const downloadMeme = () => {

        let downloadFigure = document.getElementById('export');

        html2canvas(downloadFigure, {allowTaint: true, useCORS: true, logging: true})
            .then((canvas) => {
                let img = canvas.toDataURL('image/jpg', 1.0);
                let link = document.createElement('a');
                link.download = 'memepropio.jpg';
                link.href = img;
                link.click();
            }
        )
    }

    return (
        <div className='text-center'>
            <h1 className='my-3 text-center'>Editor de memes</h1>

            <h3>Ingrese el texto del meme</h3>
            <input onChange={handleText} className='form-control w-50 mb-5 m-auto d-block' type='text' placeholder='poné tu frase' name='meme' aria-label='' />

            <h3>Elegí tu imagen favorita</h3>
            {/* <select onChange={handleSelect} className='form-select w-50 mx-auto'>
                <option hidden>Seleccione una imagen...</option>
                {
                    memesArray?.map((meme) => (
                            <option key={meme.id} value={meme.url}>{meme.name}</option>
                        )
                    )
                }
            </select> */}
            <div className='d-flex overflow-x-scroll w-75 p-1 border mx-auto'>
                {
                    memesArray?.map((meme) => (
                            <img 
                                key={meme.id}
                                src={meme.url}
                                name={meme.name}
                                alt={meme.name}
                                style={{height: 100, marginRight: 5}}
                                onClick={handleSelect}
                            />
                        )
                    )
                }
            </div>

            <figure className='d-inline-flex flex-column align-items-center my-3' id='export'>
                <p>{textMeme}</p>
                { (imgMeme !== null)
                    ? <img src={imgMeme} alt='meme' />
                    : null
                }
            </figure>

            <button onClick={downloadMeme} type='button' className='d-block mx-auto btn btn-primary'>Decargar</button>
        </div>
    )
}

export default ImgMemes