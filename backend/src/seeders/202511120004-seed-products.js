'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    // Insert products with specific IDs to match some frontend expectations (e.g., 2 and 5)
    await queryInterface.bulkInsert('Products', [
      {
        id: 2,
        name: 'Sample Product 2',
        contentHTML: '<p>Sample HTML</p>',
        contentMarkdown: 'Sample markdown',
        statusId: 'S1',
        categoryId: 'C1',
        view: 0,
        madeby: 'VN',
        material: 'Cotton',
        brandId: 'B1',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 5,
        name: 'Sample Product 5',
        contentHTML: '<p>Sample HTML</p>',
        contentMarkdown: 'Sample markdown',
        statusId: 'S1',
        categoryId: 'C2',
        view: 0,
        madeby: 'VN',
        material: 'Linen',
        brandId: 'B2',
        createdAt: now,
        updatedAt: now,
      }
    ], {});

    // Product details for product 2 and 5
    await queryInterface.bulkInsert('Productdetails', [
      {
        productId: 2,
        description: 'Detail for product 2',
        nameDetail: 'Variant A',
        originalPrice: 100000,
        discountPrice: 90000,
        createdAt: now,
        updatedAt: now,
      },
      {
        productId: 5,
        description: 'Detail for product 5',
        nameDetail: 'Variant B',
        originalPrice: 150000,
        discountPrice: 120000,
        createdAt: now,
        updatedAt: now,
      },
    ], {});

    // Link sizes (assume productdetail ids are 1 and 2 if table is empty; fallback by selecting ids)
    const [productDetailRows] = await queryInterface.sequelize.query('SELECT id, productId FROM Productdetails ORDER BY id ASC');
    const pd2 = productDetailRows.find(r => r.productId === 2);
    const pd5 = productDetailRows.find(r => r.productId === 5);
    const pdsInserts = [];
    if (pd2) {
      pdsInserts.push({ productdetailId: pd2.id, width: '10', height: '20', weight: '300', sizeId: 'M', createdAt: now, updatedAt: now });
    }
    if (pd5) {
      pdsInserts.push({ productdetailId: pd5.id, width: '12', height: '22', weight: '350', sizeId: 'L', createdAt: now, updatedAt: now });
    }
    if (pdsInserts.length) {
      await queryInterface.bulkInsert('ProductDetailSizes', pdsInserts, {});
    }

    // Images (optional empty image)
    const piInserts = [];
    if (pd2) {
      piInserts.push({ caption: 'Image A', productdetailId: pd2.id, image: '', createdAt: now, updatedAt: now });
    }
    if (pd5) {
      piInserts.push({ caption: 'Image B', productdetailId: pd5.id, image: '', createdAt: now, updatedAt: now });
    }
    if (piInserts.length) {
      await queryInterface.bulkInsert('Productimages', piInserts, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Productimages', null, {});
    await queryInterface.bulkDelete('ProductDetailSizes', null, {});
    await queryInterface.bulkDelete('Productdetails', null, {});
    await queryInterface.bulkDelete('Products', { id: [2, 5] }, {});
  },
};
