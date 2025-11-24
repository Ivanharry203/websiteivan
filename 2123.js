 document.getElementById('calculateBtn').addEventListener('click', calculateLoss);
        
        function calculateLoss() {
            // Ambil nilai input
            const measurementIn = parseFloat(document.getElementById('measurementIn').value) || 0;
            const measurementOut = parseFloat(document.getElementById('measurementOut').value) || 0;
            const connectorCount = parseInt(document.getElementById('connectorCount').value) || 0;
            const spliceCount = parseInt(document.getElementById('spliceCount').value) || 0;
            const cableLength = parseFloat(document.getElementById('cableLength').value) || 0;
            const splitter1to2 = parseInt(document.getElementById('splitter1to2').value) || 0;
            const splitter1to4 = parseInt(document.getElementById('splitter1to4').value) || 0;
            const splitter1to8 = parseInt(document.getElementById('splitter1to8').value) || 0;
            const splitter1to16 = parseInt(document.getElementById('splitter1to16').value) || 0;
            
            // Tentukan panjang gelombang
            const wavelength = document.querySelector('input[name="wavelength"]:checked').value;
            
            // Tentukan redaman kabel berdasarkan panjang gelombang
            const cableLossRate = wavelength === "1550" ? 0.22 : 0.35;
            
            // Hitung komponen loss
            const lossInOut = measurementOut - measurementIn;
            const lossConnector = connectorCount * 0.3;
            const lossSplice = spliceCount * 0.1;
            const lossCable = (cableLength / 1000) * cableLossRate;
            const lossSplitter = (splitter1to2 * 3.5) + (splitter1to4 * 7.2) + 
                               (splitter1to8 * 10.5) + (splitter1to16 * 13.7);
            
            // Hitung total loss
            const totalLoss = lossInOut + lossConnector + lossSplice + lossCable + lossSplitter;
            
            // Hitung power budget
            const margin = 3;
            const powerBudget = totalLoss + margin;
            
            // Tampilkan hasil
            document.getElementById('lossInOut').textContent = lossInOut.toFixed(2) + ' dB';
            document.getElementById('lossConnector').textContent = lossConnector.toFixed(2) + ' dB';
            document.getElementById('lossSplice').textContent = lossSplice.toFixed(2) + ' dB';
            document.getElementById('lossCable').textContent = lossCable.toFixed(2) + ' dB';
            document.getElementById('lossSplitter').textContent = lossSplitter.toFixed(2) + ' dB';
            document.getElementById('powerBudget').textContent = powerBudget.toFixed(2) + ' dB';
            document.getElementById('totalLoss').textContent = totalLoss.toFixed(2) + ' dB';
            document.getElementById('totalLossBreakdown').textContent = totalLoss.toFixed(2) + ' dB';
            
            // Tentukan status berdasarkan power budget
            const statusElement = document.getElementById('statusText');
            statusElement.className = 'result-status';
            
            if (powerBudget <= 28) {
                statusElement.textContent = 'LAYAK (GPON B+)';
                statusElement.classList.add('very-good');
            } else if (powerBudget <= 32) {
                statusElement.textContent = 'LAYAK (GPON C+)';
                statusElement.classList.add('good');
            } else if (powerBudget <= 35) {
                statusElement.textContent = 'LAYAK (XG-PON)';
                statusElement.classList.add('warning');
            } else if (powerBudget <= 37) {
                statusElement.textContent = 'LAYAK (XGS-PON)';
                statusElement.classList.add('warning');
            } else {
                statusElement.textContent = 'TIDAK LAYAK ODN (Loss Melebihi Batas)';
                statusElement.classList.add('danger');
            }
        }