import React from 'react';

const TextSettings = ({
    isUppercase,
    isBold,
    isTextShadow,
    isItalic,
    setIsUppercase,
    setIsBold,
    setIsTextShadow,
    setIsItalic,
    fontSize,
    setFontSize,
}) => {
    return (
        <div className='bg-light d-flex justify-content-center align-items-center flex-column p-3'>
            <div className='checkboxes d-inline-flex mb-2'>
                <div className="form-check">
                    <input
                        className="form-check-input mx-1"
                        type="checkbox"
                        value={isUppercase}
                        id="flexCheckUppercase"
                        checked={isUppercase}
                        onChange={() => setIsUppercase(!isUppercase)}
                    />
                    <label className="form-check-label text-uppercase" htmlFor="flexCheckUppercase">
                        mayúsculas
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input mx-1"
                        type="checkbox"
                        value={isBold}
                        id="flexCheckBold"
                        onChange={() => setIsBold(!isBold)} />
                    <label className="form-check-label fw-bold" htmlFor="flexCheckBold">
                        negrita
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input mx-1"
                        type="checkbox"
                        value={isTextShadow}
                        id="flexCheckTextShadow"
                        checked={isTextShadow}
                        onChange={() => setIsTextShadow(!isTextShadow)} />
                    <label className="form-check-label text-shadow" htmlFor="flexCheckTextShadow">
                        sombra en texto
                    </label>
                </div>

                <div className="form-check">
                    <input className="form-check-input mx-1"
                        type="checkbox"
                        value={isItalic}
                        id="flexCheckItalics"
                        onChange={() => setIsItalic(!isItalic)} />
                    <label className="form-check-label fst-italic" htmlFor="flexCheckItalics">
                        itálica
                    </label>
                </div>
            </div>

            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="inputFontSize" className="col-form-label">Tamaño de letra</label>
                </div>
                <div className="col-auto">
                    <input type="number"
                        id="inputFontSize"
                        className="form-control text-end"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default TextSettings;
