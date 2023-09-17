const AWS = require('aws-sdk');
const pinecone = require('pinecone');
const openai = require('openai');

AWS.config.update({ region: 'your-region' }); // Set your AWS region

// Initialize Pinecone
pinecone.init({
    apiKey: '7bd278db-766f-4978-a090-4b8b01973196',
    environment: 'gcp-starter'
});

// Initialize OpenAI
const openaiApiKey = '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';
const openaiClient = new openai.ChatCompletion({
    apiKey: openaiApiKey
});

function createIndex(text = "./andromious.txt", indexName = "scribe") {
    // Wherever we're storing the documents for text
    const loader = new TextLoader(text);
    const documents = loader.load();
    const textSplitter = new CharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 0 });
    const docs = textSplitter.splitDocuments(documents);

    const embeddings = new OpenAIEmbeddings();

    // First, check if our index already exists. If it doesn't, we create it
    if (!pinecone.listIndexes().includes(indexName)) {
        // Create a new index
        pinecone.createIndex({
            name: indexName,
            metric: 'cosine',
            dimension: 1536
        });
    }

    // The OpenAI embedding model `text-embedding-ada-002 uses 1536 dimensions`
    const docsearch = new Pinecone({
        documents: docs,
        embeddings: embeddings,
        indexName: indexName
    });

    return docsearch;
}

function queryDatabase(query, indexName = "scribe") {
    const embeddings = new OpenAIEmbeddings();
    
    // Load existing index
    const docsearch = new Pinecone({
        indexName: indexName,
        embeddings: embeddings
    });

    const docs = docsearch.similaritySearch(query);
    console.log(docs[0].pageContent);
    return docs[0].pageContent;
}

// Add Text to Existing Index
function addToIndex(text, indexName = "scribe") {
    const embeddings = new OpenAIEmbeddings();
    const index = new pinecone.Index(indexName);
    const vectorstore = new Pinecone(index, embeddings.embedQuery, "text");
    vectorstore.addTexts(text);
}

function addDocuments(text, indexName = "scribe") {
    const loader = new TextLoader(text);
    const documents = loader.load();
    const embeddings = new OpenAIEmbeddings();
    const index = new pinecone.Index(indexName);
    const vectorstore = new Pinecone(index, embeddings.embedQuery, "text");
    vectorstore.addDocuments(documents);
}

function llmQuery(query, indexName = "scribe") {
    // completion llm
    const llm = new ChatOpenAI({
        openaiApiKey: "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",
        modelName: 'gpt-3.5-turbo',
        temperature: 0.0
    });

    const context = queryDatabase(query);

    const prompt = "Answer the following question with provided context: " + query + "\nContext : " + context;

    return openaiClient.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ]
    })
    .then(response => {
        return response.choices[0].message.content;
    });
}

// Lambda handler
exports.handler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        if ("input" in requestBody) {
            const value = requestBody.input;
            addDocuments("./andromious3.txt");
        }

        if ("query" in requestBody) {
            const query = requestBody.query;
            const result = await llmQuery(query);

            return {
                statusCode: 200,
                body: JSON.stringify(result)
            };
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message })
        };
    }
};