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
    boxSize,
    setBoxSize,
    setHorizontalPosition,
    setVerticalPosition,
}) => {
    return (
        <div className='bg-light d-flex justify-content-center align-items-center flex-column rounded p-3'>
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
                    <input 
                        className="form-check-input mx-1"
                        type="checkbox"
                        value={isBold}
                        id="flexCheckBold"
                        onChange={() => setIsBold(!isBold)} />
                    <label className="form-check-label fw-bold" htmlFor="flexCheckBold">
                        negrita
                    </label>
                </div>

                <div className="form-check">
                    <input 
                        className="form-check-input mx-1"
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
                    <input 
                        className="form-check-input mx-1"
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
                <div className="col-auto align-items-center">
                    <label htmlFor="inputFontSize" className="col-form-label d-inline-flex">Tamaño de letra</label>
                    <input 
                        type="number"
                        id="inputFontSize"
                        className="form-control text-end d-inline-flex ms-1 p-1"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseFloat(e.target.value))}
                    />
                </div>
                <div className="col-auto align-items-center">
                    <label htmlFor="inputBoxSize" className="col-form-label d-inline-flex">Ancho de caja</label>
                    <input 
                        type="number"
                        id="inputBoxSize"
                        className="form-control text-end d-inline-flex ms-1 p-1"
                        value={boxSize}
                        onChange={(e) => setBoxSize(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div className="row g-3 align-items-center my-2">
                <div className="col-auto d-inline-flex align-items-center">
                    <label htmlFor="horizontalRange" className="form-label m-0">Horizontal</label>
                    <input 
                        type="range" 
                        className="form-range rounded ms-1" 
                        id="horizontalRange" 
                        defaultValue={0} 
                        onChange={(e) => setHorizontalPosition(parseFloat(e.target.value))} 
                    />
                </div>
                <div className="col-auto d-inline-flex align-items-center">
                    <label htmlFor="verticalRange" className="form-label m-0">Vertical</label>
                    <input 
                        type="range" 
                        className="form-range rounded ms-1" 
                        id="verticalRange" 
                        defaultValue={0} 
                        onChange={(e) => setVerticalPosition(parseFloat(e.target.value))} 
                    />
                </div>
            </div>
        </div>
    );
};

export default TextSettings;
