const consumerManager = () => {
    let canContinue = true;
    let consumers = 0;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const consumer = async (index, fn) => {
        try {
            consumers++;
            await fn(index);
        } finally {
            consumers--
            if (canContinue) {
                consumer(index, fn);
            }
        }
    }

    const start = (consumerNumber, fn) => {
        canContinue = true;
        for (let index = 1; index <= consumerNumber; index++) {
            consumer(index, fn);
        }
    }

    const stop = async () => {
        canContinue = false;
        while (consumers != 0) {
            await sleep(100)
        }
        return;
    }

    const consumerNumber = () => consumers;

    return {
        start,
        stop,
        consumerNumber
    };
};



const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// (async () => {
//     console.log('Number of consumers: ', consumerManager.consumerNumber());

//     consumerManager.start(10, async i => {
//         await sleep(100 * i);
//     });

//     console.log('Number of consumers: ', consumerManager.consumerNumber());
//     let i = 0;
//     while (i < 10) {
//         await sleep(150)
//         console.log('Number of consumers: ', consumerManager.consumerNumber());
//         i++
//     }

//     consumerManager.stop()
//     console.log('stop');

//     while (consumerManager.consumerNumber() != 0) {
//         console.log('Number of consumers: ', consumerManager.consumerNumber());
//         await sleep(100)
//     }
// })();



// (async () => {
//     const cm = consumerManager();
//     const cm2 = consumerManager();
//     console.log('Number of consumers cm: ', cm.consumerNumber());
//     console.log('Number of consumers cm2: ', cm2.consumerNumber());

//     cm.start(10, async i => {
//         await sleep(100 * i);
//     });

//     cm2.start(5, async i => {
//         await sleep(100 * i);
//     });

//     console.log('Number of consumers cm: ', cm.consumerNumber());
//     console.log('Number of consumers cm2: ', cm2.consumerNumber());
//     let i = 0;
//     while (i < 10) {
//         await sleep(150)
//         console.log('Number of consumers cm: ', cm.consumerNumber());
//         console.log('Number of consumers cm2: ', cm2.consumerNumber());
//         i++
//     }

//     cm.stop();
//     cm2.stop();
//     console.log('stop');

//     while (cm.consumerNumber() != 0 && cm2.consumerNumber() != 0) {
//         console.log('Number of consumers cm: ', cm.consumerNumber());
//         console.log('Number of consumers cm2: ', cm2.consumerNumber());
//         await sleep(100)
//     }
// })();