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
    fontFamily,
    setFontFamily,
    boxSize,
    setBoxSize,
    setHorizontalPosition,
    setVerticalPosition,
    setRotation,
}) => {

    return (
        // Caja para edición de línea de texto.
        <div className='bg-light d-flex justify-content-center align-items-center flex-column rounded p-3'>
            <div className='checkboxes d-inline-flex mb-2'>
                {/* Checkbox para activar/desactivar mayúsculas */}
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

                {/* Checkbox para activar/desactivar negritas */}
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

                {/* Checkbox para activar/desactivar sombra de texto */}
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

                {/* Checkbox para activar/desactivar itálicas */}
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
                {/* Cuadro para modificar el tamaño de la letra */}
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
                {/* Cuadro para modificar el tamaño de la caja que contiene el texto */}
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

            <div className="row g-3 align-items-center my-4">
                {/* Regulador para ubicación del texto sobre el eje X de la figura*/}
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
                {/* Regulador para ubicación del texto sobre el eje Y de la figura*/}
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
                {/* Regulador para rotación de la caja de texto*/}
                <div className="col-auto d-inline-flex align-items-center">
                    <label htmlFor="rotationRange" className="form-label m-0">Rotación</label>
                    <input 
                        type="range" 
                        className="form-range rounded ms-1" 
                        id="rotationRange" 
                        defaultValue={50} 
                        max={140}
                        min={-40}
                        onChange={(e) => setRotation(parseFloat(e.target.value))} 
                    />
                </div>
            </div>

            {/* Selector para elegir la tipografía del texto */}
            <div className='d-flex align-items-center'>
                <label htmlFor="inputFontFamily" className="text-nowrap form-label mb-0 mx-2">Tipo de letra</label>
                <select 
                    name="fontFamily" 
                    className="form-select"
                    id="inputFontFamimly" 
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}>
                    <option value="Impact" style={{fontFamily: 'Impact'}} className='mb-1'>Impact</option>
                    <option value="Arial" style={{fontFamily: 'Arial'}} className='mb-1'>Arial</option>
                    <option value="Georgia" style={{fontFamily: 'Georgia'}} className='mb-1'>Georgia</option>
                    <option value="Verdana" style={{fontFamily: 'Verdana'}} className='mb-1'>Verdana</option>
                    <option value="Courier New" style={{fontFamily: 'Courier New'}} className='mb-1'>Courier New</option>
                    <option value="Lucida Sans" style={{fontFamily: 'Lucida Sans'}} className='mb-1'>Lucida Sans</option>
                    <option value="Segoe UI" style={{fontFamily: 'Segoe UI'}} className='mb-1'>Segoe UI</option>
                    <option value="Times New Roman" style={{fontFamily: 'Times New Roman'}} className='mb-1'>Times New Roman</option>
                    <option value="Cambria" style={{fontFamily: 'Cambria'}} className='mb-1'>Cambria</option>
                </select>
            </div>
        </div>
    );
};

export default TextSettings;
