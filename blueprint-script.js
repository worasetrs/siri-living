document.addEventListener('DOMContentLoaded', function() {
    
    // =================== CONFIGURATION ===================
    // 1. PASTE YOUR GOOGLE APPS SCRIPT URL HERE
    //
    //    To save blueprint submissions to a Google Sheet you can deploy a
    //    Google Apps Script as a Web App. See the linked article for more
    //    details on setting up a backend using Google Sheets and Apps Script
    //    【104053049609343†L109-L143】. Once you have your Web App URL, paste
    //    it below. When left as-is the form will still function and show a
    //    success message locally, but no data will be saved.
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz2xuIm1TiMhtw0b1k9aSjK6ObEnNnb2h4tKdz5EzAiayrmXlYqT2CFcK3PsdReWCkWwQ/exec';
    // =====================================================

    // --- Data for Dynamic Image Selection ---
    const styleData = {
        'Modern Tropical': {
            // Use a representative exterior shot as the main image
            mainImage: 'de57d2db-ba05-4a25-83cf-e70210909cc8.png',
            // Expanded reference images list (15 images total)
            refImages: [
                { id: 'MT1',  src: '51d6e405-9587-44b1-bbe2-dad686a4d584.png' },
                { id: 'MT2',  src: '48f296df-42d8-4d68-9209-dba98b7ada95.png' },
                { id: 'MT3',  src: '7a842eb4-ca19-422b-8ee9-0a04fe8378be.png' },
                { id: 'MT4',  src: '85d284ca-a962-4c97-b7cc-b99df458c7a1.png' },
                { id: 'MT5',  src: 'd6ce1857-69b5-453a-b0db-641ff5c8c875.png' },
                { id: 'MT6',  src: '1d531b46-6abd-4ab7-b058-45b3c1705b80.png' },
                { id: 'MT7',  src: '33925e70-197d-4cc4-b0d3-d3903d74987c.png' },
                { id: 'MT8',  src: '8e7e01e9-50ae-45ba-af5e-830e7f6b6394.png' },
                { id: 'MT9',  src: 'e6acd081-bfae-485c-9140-8e35b2e27f34.png' },
                { id: 'MT10', src: '473a76ae-def9-424f-86f9-d8ced7f63924.png' },
                { id: 'MT11', src: 'e668f124-662e-4d93-ac94-ea8cf01406ab.png' },
                { id: 'MT12', src: '2fbc8b10-da15-482e-aaa3-935fb4ab66c6.png' },
                { id: 'MT13', src: '54a37f3d-fb08-41c1-b0eb-a671b5188519.png' },
                { id: 'MT14', src: 'c66fa808-9461-4ec4-bacb-1ab75d373794.png' },
                { id: 'MT15', src: 'eedf6964-62a3-4e3b-b609-41eb98cd4ebf.png' }
            ]
        },
        'Classic Luxury': {
            mainImage: '5fec14b6-5861-49be-aed4-f4635d371388.png',
            refImages: [
                { id: 'CL1',  src: 'b38a00e1-b738-4712-9d9b-2108ac8660e7.png' },
                { id: 'CL2',  src: '86ad9447-df79-4274-94c1-9cf58f8d4d2d.png' },
                { id: 'CL3',  src: 'a6fdcac7-8db6-4d53-9bc9-097f7d4d7a3e.png' },
                { id: 'CL4',  src: 'daa7fcd1-4a93-4758-a65e-8426c11fc0a1.png' },
                { id: 'CL5',  src: 'ec6d0d8d-ffd5-4558-aa7c-15ba1940b4b4.png' },
                { id: 'CL6',  src: 'a538a841-ba95-4d8f-ae88-542db73bdf5f.png' },
                { id: 'CL7',  src: 'e570df04-009f-4175-bf23-967e476df657.png' },
                { id: 'CL8',  src: '47cbfbde-567e-4ed2-b736-9366180bb2fe.png' },
                { id: 'CL9',  src: '5b66ecf6-4f9a-4ef0-8501-f766eb1b02c3.png' },
                { id: 'CL10', src: '89ab8877-8edc-4514-b804-a4ba117886e4.png' },
                { id: 'CL11', src: '7dc1c91b-3984-402c-ade9-21bfd9ddb239.png' },
                { id: 'CL12', src: '4c4815d9-93cc-4e7f-91b5-0af5ed9be7eb.png' },
                { id: 'CL13', src: '159ff579-50d3-4c4d-994a-70556bdf09b8.png' },
                { id: 'CL14', src: '1aa51d3c-a7a5-4857-a612-9332db6f1f62.png' },
                { id: 'CL15', src: '50a49bb5-c613-4386-bd63-dd30955b6431.png' }
            ]
        },
        'Minimalist White': {
            mainImage: '64d9f002-79af-46a5-92b5-2e924538f37e.png',
            refImages: [
                { id: 'MW1',  src: 'f45e924e-63b7-44ee-b965-5453117270c5.png' },
                { id: 'MW2',  src: 'fb727efb-ae8d-46fc-b702-0e2b4ce76f04.png' },
                { id: 'MW3',  src: 'cd2b8a60-ca61-48e1-bc45-e40e61f40b09.png' },
                { id: 'MW4',  src: '78ec1e7f-f271-4680-b8ac-0ed9b589d14b.png' },
                { id: 'MW5',  src: '162bc611-e812-4fe6-a306-4011a4c98304.png' },
                { id: 'MW6',  src: '99d87f80-09bc-4637-95cf-b27eb314fe34.png' },
                { id: 'MW7',  src: '645f3559-2aa4-4b97-a3df-3665e2744c0c.png' },
                { id: 'MW8',  src: 'd075e0c3-7fa4-4927-9cf4-41574200f311.png' },
                { id: 'MW9',  src: '024e4613-ba75-4b2d-b17a-047ab7dfdd61.png' },
                { id: 'MW10', src: '5765c8c5-1bd5-4590-b9e7-3493ec764cd3.png' },
                { id: 'MW11', src: '1794e06b-2323-48da-a796-677e665f15b4.png' },
                { id: 'MW12', src: 'e6f6d49b-5f29-44d3-94e0-77057e98c147.png' },
                { id: 'MW13', src: '0a87ee87-d17b-49c1-bc3a-08e2ee8b1dd7.png' },
                { id: 'MW14', src: '034d4f52-da8f-4d5e-9ddd-109add3fee68.png' },
                { id: 'MW15', src: '352f174c-b423-4578-9ede-93b4a68ffce6.png' }
            ]
        },
        'Balinese Natural': {
            mainImage: 'a51cebc9-d96e-4f77-8770-79762838cdfd.png',
            refImages: [
                { id: 'BN1',  src: 'a2bc5499-2603-47fe-895c-567e75f4a237.png' },
                { id: 'BN2',  src: 'aad6dcf1-2ece-44c6-9bc7-5a42c4055877.png' },
                { id: 'BN3',  src: '1020d33d-5a48-4979-b989-42c7286dc089.png' },
                { id: 'BN4',  src: '40cffa91-1354-4379-b2e6-5be71d1a9a55.png' },
                { id: 'BN5',  src: 'c7dc522e-719e-4d70-8241-090019e87847.png' },
                { id: 'BN6',  src: '6c7511cc-ac27-428f-be90-a6b2f4dfd670.png' },
            ]
        }
    };

    // --- Element Selections ---
    const formSteps = Array.from(document.querySelectorAll('.form-step'));
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const form = document.forms['blueprint-form'];
    const progressBarFill = document.querySelector('.progress-bar-fill');
    
    let currentStep = 0;

    // --- Main Style (Step 1) Logic ---
    const mainStyleGrid = document.getElementById('main-style-grid');
    const mainStyleInput = document.getElementById('main-style-input');

    Object.keys(styleData).forEach(styleName => {
        const option = document.createElement('div');
        option.className = 'style-option';
        option.dataset.styleName = styleName;
        option.innerHTML = `
            <img src="${styleData[styleName].mainImage}" alt="${styleName}">
            <div class="style-name">${styleName}</div>
        `;
        mainStyleGrid.appendChild(option);
        
        option.addEventListener('click', () => {
            // Single-select logic
            mainStyleGrid.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            mainStyleInput.value = styleName;
            validateStep(0);
        });
    });

    // --- Reference Image (Step 2) Logic ---
    const refImageGrid = document.getElementById('ref-image-grid');
    const selectedStylesInput = document.getElementById('selected-styles-input');

    function populateRefImages(mainStyle) {
        refImageGrid.innerHTML = ''; // Clear previous images
        const refs = styleData[mainStyle].refImages;
        refs.forEach(ref => {
            const option = document.createElement('div');
            option.className = 'style-option';
            option.dataset.styleName = ref.id; // Use ID for tracking
            option.innerHTML = `
                <img src="${ref.src}" alt="Reference Image ${ref.id}">
            `;
            refImageGrid.appendChild(option);

            option.addEventListener('click', () => {
                option.classList.toggle('selected');
                updateSelectedRefImages();
                validateStep(1);
            });
        });
        updateSelectedRefImages(); // Reset hidden input
    }
    
    function updateSelectedRefImages() {
        const selectedRefs = Array.from(refImageGrid.querySelectorAll('.style-option.selected'))
            .map(opt => opt.dataset.styleName)
            .join(', ');
        selectedStylesInput.value = selectedRefs;
    }


    // --- General Step Navigation ---
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        const progressPercentage = ((stepIndex) / (formSteps.length - 1)) * 100;
        progressBarFill.style.width = `${progressPercentage}%`;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if(currentStep === 0) { // After selecting main style
                    const selectedMainStyle = mainStyleInput.value;
                    populateRefImages(selectedMainStyle);
                }
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // --- Validation ---
    function validateStep(stepIndex) {
        let isValid = true;
        const currentStepElement = formSteps[stepIndex];
        
        if (stepIndex === 0) { // Main Style
            const validationMsg = document.getElementById('main-style-validation');
            if (!mainStyleInput.value) {
                validationMsg.style.display = 'block'; isValid = false;
            } else { validationMsg.style.display = 'none'; }
        } else if (stepIndex === 1) { // Ref Images
            const selectedCount = refImageGrid.querySelectorAll('.style-option.selected').length;
            const validationMsg = document.getElementById('ref-image-validation');
            if (selectedCount < 2) {
                validationMsg.style.display = 'block'; isValid = false;
            } else { validationMsg.style.display = 'none'; }
        } else {
            const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false; input.style.borderColor = 'red';
                } else { input.style.borderColor = 'var(--border-color)'; }
            });
        }
        return isValid;
    }

    // --- Final Form Submission ---
    const submitButton = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!validateStep(currentStep)) return;

        submitButton.disabled = true;
        submitButton.innerHTML = 'Saving Your Data...';

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                // SUCCESS! DATA IS SAVED
                submitButton.innerHTML = 'Request Submitted';
                submitButton.disabled = true;
                formStatus.textContent = 'Thank you! Your blueprint request has been submitted. We will contact you soon.';
                formStatus.className = 'status-success';
            })
            .catch(error => {
                // ERROR! SHOW MESSAGE
                submitButton.disabled = false;
                submitButton.innerHTML = 'Submit Blueprint Request';
                formStatus.textContent = 'Error! Could not save data. Please try again.';
                formStatus.className = 'status-error';
                console.error('Error!', error.message);
            });
    });

    // Initialize first step
    showStep(currentStep);
});